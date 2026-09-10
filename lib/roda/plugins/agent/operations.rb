# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  module Operations
    def create_agent!(name)
      klass = agent_class!(name)
      resolver = resolver!(name)
      agent = resolver.find(klass) || resolver.create(klass)
      {ok: true, id: agent.id}
    end

    def update_agent!(name, params, sse)
      klass = agent_class!(name)
      resolver = resolver!(name)
      stream = agent_stream!(name).new(sse).tap(&:hello)
      agent = resolver.find!(klass)
      res = agent.talk(params["q"], stream:)
      stream&.goodbye(res:)
    rescue ActiveRecord::RecordNotFound
      stream&.error(message: "agent unavailable")
    rescue
      stream&.error(message: "internal server error")
    end

    def destroy_agent!(name)
      klass = agent_class!(name)
      resolver = resolver!(name)
      resolver.destroy(klass)
      {ok: true}
    end

    private

    ##
    # Build a resolver for the named agent, bound to the Roda
    # application it belongs to and the request being served.
    # @param [String] name
    # @return [Roda::RodaPlugins::Agent::Resolver]
    def resolver!(name)
      agent_resolver!(name).new(scope, self)
    end

    def agent_attributes!(name)
      LLM::Object.from(roda_class.registry[name])
    end

    def agent_class!(name)
      agent_attributes!(name)[:class]
    end

    def agent_resolver!(name)
      agent_attributes!(name).resolver
    end

    def agent_stream!(name)
      agent_attributes!(name).stream || LLM::Roda::Stream
    end
  end
end
