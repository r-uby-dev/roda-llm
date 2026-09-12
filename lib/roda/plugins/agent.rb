# frozen_string_literal: true

module Roda::RodaPlugins
  module Agent
    require_relative "agent/operations"
    require_relative "agent/resolver"
    require_relative "agent/resolver/session"
    require_relative "agent/stream"
    extend self


    ##
    # Adds the Roda plugins the agent routes need. The host app
    # still owns `:sessions`, because the session is the host's
    # business; `:route_csrf` comes with the routes, because they
    # are the ones that need guarding (`check_header` so the token
    # can arrive the way the console sends it).
    #
    # @param [Roda] app
    # @param [Hash] _options
    # @return [void]
    def load_dependencies(app, _options)
      app.plugin :json
      app.plugin :sse
      app.plugin :all_verbs
      app.plugin :route_csrf, check_header: true
    end

    ##
    # @param [Roda] app
    # @param [Hash] options
    # @return [void]
    def configure(app, options)
      options  = {}.merge!(options)
      registry = {}
      options[:agents].each do |agent|
        resolver, klass = agent[:resolver], agent[:class]
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
            delete(true) { [resolver!(name).check_csrf!, destroy_agent!(name)].last }
            stream!(name)
          end
        end
      end

      private

      ##
      # The stream endpoint. It is a POST because the prompt travels in
      # the body, and because it creates the agent when none is bound:
      # a GET that mutates would be fair game for a prefetcher or a
      # retry, and the prompt would end up in access logs with it.
      #
      # Since it streams, it cannot lean on Roda writing the session
      # cookie at the end of the request: the response is halted with
      # headers of its own, and the client is already reading the
      # stream by then.
      #
      # So find or create the agent and persist the session first, then
      # halt with those headers kept. Without that the agent is created
      # but never found again, and every message starts a new
      # conversation.
      #
      # @param [String] name
      # @return [void]
      def stream!(name)
        post do
          ##
          # Guarded the way the delete is: a turn spends the visitor's
          # tokens and can create an agent, so it changes state, and a
          # cross-site page must not be able to start one.
          resolver!(name).check_csrf!
          agent = upsert_agent!(name)

          ##
          # Read the prompt while the request is still in hand. The body
          # below runs after the request has been served, when there is no
          # rack.input left to read a parameter from.
          q = params["q"]
          persist_session(response.headers, session) if respond_to?(:persist_session)
          halt [
            200,
            response.headers.merge(Roda::RodaPlugins::SSE::RequestMethods::HEADERS),
            Roda::RodaPlugins::SSE::Body.new(proc { |sse| stream_agent!(name, agent, q, sse) })
          ]
        end
      end
    end
  end
  register_plugin(:agent, Agent)
end

module LLM
  Roda = Roda::RodaPlugins::Agent
end
