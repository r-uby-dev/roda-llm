# frozen_string_literal: true

module Roda::RodaPlugins
  module Agent
    require_relative "agent/operations"
    require_relative "agent/scope"
    require_relative "agent/scope/session"
    require_relative "agent/stream"

    extend self

    DEFAULTS = {path: "agents", scope: :session}.freeze
    SCOPES = {session: Scope::Session}.freeze

    ##
    # Adds the Roda plugins the agent routes need. The host app
    # owns `:sessions` and `:route_csrf`; here we only pull in
    # the JSON/SSE/verb helpers the inline routes rely on.
    #
    # @param [Roda] app
    # @param [Hash] _options
    # @return [void]
    def load_dependencies(app, _options)
      app.plugin :json
      app.plugin :sse
      app.plugin :all_verbs
    end

    ##
    # @param [Roda] _app
    # @param [Hash] options
    # @return [void]
    def configure(_app, options)
      options = DEFAULTS.merge(options)
      @path = options[:path]
      options[:agents].each do |agent|
        scope = SCOPES[agent[:scope]] || agent[:scope]
        key = agent[:class].agent.name
        registry[key] = LLM::Object.from agent.slice(:class, :stream).merge!(scope:)
      end
    end

    ##
    # @return [Hash]
    def registry
      @registry ||= {}
    end

    ##
    # @return [String]
    def path
      @path
    end

    module RequestMethods
      include Operations

      ##
      # Declares the agent fleet routes inline in the host app's
      # route block, e.g. `r.agent!`. The host app's own plugins
      # (sessions, csrf, json, sse, all_verbs) are in effect.
      #
      # @return [void]
      def agent!
        path = LLM::Roda.path
        on(path) do
          on String do |name|
            post(true)   { [agent_scope!(name).new(self).check_csrf!, create!(name)].last }
            sse          { |sse| update!(name, params, sse) }
            delete(true) { [agent_scope!(name).new(self).check_csrf!, destroy!(name)].last }
          end
        end
      end
    end
  end
  register_plugin(:agent, Agent)
end

module LLM
  Roda = Roda::RodaPlugins::Agent
end