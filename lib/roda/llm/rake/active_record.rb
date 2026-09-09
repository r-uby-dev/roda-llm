# frozen_string_literal: true

require "active_record"
require "erb"
require "rake"
require "yaml"

module LLM
end unless defined?(LLM)

module LLM::Roda
  module Rake
  end

  module Rake::ActiveRecord
    extend self

    ##
    # The environment to run migrations under. Derived from
    # the standard Rack/Sinatra/Rails env vars.
    # @return [String]
    def env
      ENV["APP_ENV"] || ENV["RACK_ENV"] || "development"
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
    # @return [void]
    def status
      connect!
      migration_context.migrations_status.each do |status, version, name|
        puts "#{status.ljust(12)} #{version}  #{name}"
      end
    end

    private

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
  end

  desc "rollback the most recent migration"
  task :rollback do
    LLM::Roda::Rake::ActiveRecord.rollback
  end

  desc "show migration status"
  task :status do
    LLM::Roda::Rake::ActiveRecord.status
  end
end
