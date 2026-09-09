# frozen_string_literal: true

require "rake"

module LLM
end unless defined?(LLM)

module LLM::Roda
  module Rake
  end

  module Rake::Migrations
    extend self

    ##
    # Generate a migration file for the given name.
    #
    # @param [String] name migration name, snake_case
    # @return [String] path of the newly created migration file
    # @raise [ArgumentError] when the name is invalid or file exists
    def generate(name)
      name = normalize(name)
      validate_name!(name)
      path = path_for(name)
      raise ArgumentError, "migration already exists: #{path}" if File.exist?(path)
      ensure_directory!
      write_migration!(path, name)
      path
    end

    ##
    # Build the `change` method body for a migration name.
    #
    # Recognises the rail-style naming conventions and scaffolds
    # a sensible starting body; unknown names get an empty block.
    #
    # @param [String] name
    # @return [String]
    def change_method(name)
      case name
      when /\Acreate_(.+)/
        create_table_body(Regexp.last_match(1))
      when /\A(add|remove)_(.*)_(to|from)_(.+)\z/
        column_change_body(
          Regexp.last_match(1),
          Regexp.last_match(2),
          Regexp.last_match(3),
          Regexp.last_match(4)
        )
      else
        empty_change_body
      end
    end

    ##
    # @return [String]
    def directory
      File.join(Dir.pwd, "db", "migrate")
    end

    private

    ##
    # @param [String] name
    # @return [String]
    def normalize(name)
      name.to_s.strip
    end

    ##
    # @param [String] name
    # @return [void]
    def validate_name!(name)
      if name.empty?
        raise ArgumentError, "migration name is required"
      end
      unless name.match?(/\A[a-z][a-z0-9_]*\z/)
        raise ArgumentError,
          "migration name must be snake_case (lowercase, numbers, _): #{name.inspect}"
      end
    end

    ##
    # @return [void]
    def ensure_directory!
      require "fileutils"
      FileUtils.mkdir_p(directory)
    end

    ##
    # @param [String] name
    # @return [String]
    def path_for(name)
      timestamp = Time.now.utc.strftime("%Y%m%d%H%M%S")
      File.join(directory, "#{timestamp}_#{name}.rb")
    end

    ##
    # @param [String] path
    # @param [String] name
    # @return [void]
    def write_migration!(path, name)
      File.write(path, template(name))
      puts "created #{path.sub(Dir.getwd, '')[1..]}"
    end

    ##
    # @param [String] name
    # @return [String]
    def template(name)
      body = indent(change_method(name), 2).rstrip
      <<~RUBY
        # frozen_string_literal: true

        class #{class_name(name)} < ActiveRecord::Migration[8.0]
        #{body}
        end
      RUBY
    end

    ##
    # @param [String] text
    # @param [Integer] spaces
    # @return [String]
    def indent(text, spaces)
      pad = " " * spaces
      text.lines.map { |line| line.strip.empty? ? line : pad + line }.join
    end

    ##
    # @param [String] name
    # @return [String]
    def class_name(name)
      name.to_s.split("_").map(&:capitalize).join
    end

    ##
    # @param [String] table
    # @return [String]
    def create_table_body(table)
      <<~RUBY
        def change
          create_table :#{table} do |t|
            # t.string :name, null: false
            t.timestamps
          end
        end
      RUBY
    end

    ##
    # @param [String] action
    # @param [String] columns
    # @param [String] direction
    # @param [String] table
    # @return [String]
    def column_change_body(action, columns, direction, table)
      type = action == "add" ? ", :type" : ""
      <<~RUBY
        def change
          #{action}_column :#{table}, :#{columns}#{type}
        end
      RUBY
    end

    ##
    # @return [String]
    def empty_change_body
      <<~RUBY
        def change
          # add your migration steps here
        end
      RUBY
    end
  end
end

namespace :'roda:llm:g' do
  desc "generate a migration (eg: rake roda:llm:g:migration[create_users])"
  task :migration, [:name] do |_task, args|
    LLM::Roda::Rake::Migrations.generate(args[:name])
  rescue ArgumentError => error
    abort error.message
  end
end
