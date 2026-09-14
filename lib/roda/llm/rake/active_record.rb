# frozen_string_literal: true

require "roda-llm"
require "active_record"
require "erb"
require "rake"
require "stringio"
require "yaml"

module LLM
end unless defined?(LLM)

module LLM::Roda
  module Rake
  end

  module Rake::ActiveRecord
    extend self

    ##
    # The environment to run migrations under.
    # Derived from ${RACK_ENV}, ${RAILS_ENV}
    # or the default ("development").
    # @return [String]
    def env
      if env = ENV.fetch("RACK_ENV", ENV["RAILS_ENV"])
        env.to_s.strip.empty? ? "development" : env
      else
        "development"
      end
    end

    ##
    # The database config for the current environment, loaded
    # from the host application's config/database.yml.
    # @return [Hash]
    def db_config
      path = File.join(Dir.pwd, "config", "database.yml")
      raw = ERB.new(File.read(path)).result
      config = YAML.safe_load(raw, aliases: true)
      if not config
        abort "roda-llm database config not found in #{path}"
      end
      config.fetch(env)
    end

    ##
    # @return [String]
    def migrations_path
      File.join(Dir.pwd, "db", "migrate")
    end

    ##
    # @return [void]
    def create
      require "active_record/tasks/database_tasks"
      connect!
      ::ActiveRecord::Tasks::DatabaseTasks.create(db_config)
    ensure
      connect!
    end

    ##
    # @return [void]
    def migrate
      connect!
      migration_context.migrate
    end

    ##
    # @return [void]
    def rollback
      connect!
      migration_context.rollback
    end

    ##
    # @return [String]
    def schema_path
      File.join(Dir.pwd, "db", "schema.rb")
    end

    ##
    # @return [String]
    def seeds_path
      File.join(Dir.pwd, "db", "seeds.rb")
    end

    ##
    # Write the schema out as db/schema.rb. This is the file a fresh
    # database is built from, so it needs regenerating whenever a
    # migration changes the schema.
    # @return [void]
    def dump
      connect!
      io = StringIO.new
      ::ActiveRecord::SchemaDumper.dump(::ActiveRecord::Base.connection_pool, io)
      File.write(schema_path, header + io.string)
      puts "dumped #{schema_path}"
    end

    ##
    # Build the schema from db/schema.rb rather than by running every
    # migration from the beginning.
    # @return [void]
    def load_schema
      connect!
      ::ActiveRecord::Schema.verbose = false
      Kernel.load(schema_path)
    end

    ##
    # Load db/seeds.rb, which holds the rows the schema cannot: the
    # reference data a fresh database needs to be usable.
    # @return [void]
    def seed
      connect!
      return unless File.exist?(seeds_path)
      Kernel.load(seeds_path)
    end

    ##
    # @return [void]
    def status
      connect!
      migration_context.migrations_status.each do |status, version, name|
        puts "#{status.ljust(12)} #{version}  #{name}"
      end
    end

    private

    ##
    # ActiveRecord's schema dump opens with a paragraph about `bin/rails
    # db:schema:load`. Say how this application regenerates it instead.
    # @return [String]
    def header
      <<~RUBY
        # This file is auto-generated from the current state of the database,
        # and is what a fresh database is built from. Do not edit it by hand:
        # change the schema with a migration, then regenerate this file.
        #
        #   rake roda:llm:db:dump     # regenerate it
        #   rake roda:llm:db:load     # build a database from it
        #
        # Rows are not schema. Reference data a fresh database needs, and the
        # dump cannot carry, belongs in db/seeds.rb - which db:load runs
        # alongside the schema.

      RUBY
    end

    ##
    # @return [void]
    def connect!
      ::ActiveRecord::Base.establish_connection(db_config)
    end

    ##
    # @return [ActiveRecord::MigrationContext]
    def migration_context
      pool = ::ActiveRecord::Base.connection_pool
      ::ActiveRecord::MigrationContext.new(
        migrations_path,
        ::ActiveRecord::SchemaMigration.new(pool),
        ::ActiveRecord::InternalMetadata.new(pool)
      )
    end
  end
end

namespace :'roda:llm:db' do
  desc "create the database"
  task :create do
    LLM::Roda::Rake::ActiveRecord.create
  end

  desc "run pending migrations (creating the database first if needed)"
  task migrate: :create do
    LLM::Roda::Rake::ActiveRecord.migrate
    LLM::Roda::Rake::ActiveRecord.dump
  end

  desc "rollback the most recent migration"
  task :rollback do
    LLM::Roda::Rake::ActiveRecord.rollback
    LLM::Roda::Rake::ActiveRecord.dump
  end

  desc "show migration status"
  task :status do
    LLM::Roda::Rake::ActiveRecord.status
  end

  desc "regenerate db/schema.rb from the database"
  task dump: :create do
    LLM::Roda::Rake::ActiveRecord.dump
  end

  desc "build the schema from db/schema.rb, then load db/seeds.rb"
  task load: :create do
    LLM::Roda::Rake::ActiveRecord.load_schema
    LLM::Roda::Rake::ActiveRecord.seed
  end

  desc "load db/seeds.rb"
  task load_seed: :create do
    LLM::Roda::Rake::ActiveRecord.seed
  end
end
