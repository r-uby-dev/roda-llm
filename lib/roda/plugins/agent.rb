# frozen_string_literal: true

module Roda::RodaPlugins
  module Agent
    require_relative "agent/operations"
    require_relative "agent/resolver"
    require_relative "agent/resolver/session"
    require_relative "agent/stream"

    extend self

    DEFAULTS = {resolver: :session}.freeze
    RESOLVERS = {session: Resolver::Session}.freeze

    ##
    # Adds the Roda plugins the agent routes need. The host app
    # owns `:sessions` and `:route_csrf`; here we only pull in
    # the JSON/SSE/all_verbs/erb helpers the inline routes rely on.
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
    # @param [Roda] app
    # @param [Hash] options
    # @return [void]
    def configure(app, options)
      options  = DEFAULTS.merge(options)
      registry = {}
      options[:agents].each do |agent|
        resolver = RESOLVERS[agent[:resolver]] || agent[:resolver]
        klass = agent[:class]
        name  = (klass < LLM::Agent ? klass : klass.agent).name
        registry[name] = LLM::Object.from agent.slice(:class, :stream).merge!(resolver:)
      end
      app.opts["roda.llm.registry"] = registry
    end

    module ClassMethods
      ##
      # @return [Hash{String => LLM::Object}]
      def registry
        opts["roda.llm.registry"] || {}
      end
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
        on("agents") do
          on String do |name|
            post(true)   { [agent_resolver!(name).new(self).check_csrf!, create_agent!(name)].last }
            sse          { |sse| update_agent!(name, params, sse) }
            delete(true) { [agent_resolver!(name).new(self).check_csrf!, destroy_agent!(name)].last }
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
