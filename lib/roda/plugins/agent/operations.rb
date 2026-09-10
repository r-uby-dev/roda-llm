# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  module Operations
    def create_agent!(name)
      klass = agent_class!(name)
      ##
      # 'self' is resolved to an instance of Roda.
      resolver = agent_resolver!(name).new(self)
      agent = resolver.find(klass) || resolver.create(klass)
      {ok: true, id: agent.id}
    end

    def update_agent!(name, params, sse)
      klass = agent_class!(name)
      ##
      # 'self' is resolved to an instance of Roda.
      resolver = agent_resolver!(name).new(self)
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
      ##
      # 'self' is resolved to an instance of Roda.
      resolver = agent_resolver!(name).new(self)
      resolver.destroy(klass)
      {ok: true}
    end

    private

    def agent_attributes!(name)
      LLM::Object.from(LLM::Roda.registry[name])
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
