# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  module Operations
    ##
    # Stream the agent to the caller.
    # @param [String] name
    # @param [LLM::Agent] agent
    # @param [String] q
    # @return [void]
    def stream_agent!(name, agent, q, sse)
      stream = agent_stream!(name).new(sse).tap(&:hello)
      res = agent.talk(q, stream:)
      stream&.goodbye(res:)
    rescue => e
      warn("roda-llm: #{e.full_message}")
      stream&.error(message: "internal server error")
    end

    ##
    # Find or create an agent.
    # @param [String] name
    # @return [LLM::Agent]
    def upsert_agent!(name)
      klass = agent_class!(name)
      resolver = resolver!(name)
      resolver.find(klass) || resolver.create(klass)
    end

    ##
    # Destroy an agent.
    # @return [Hash]
    def destroy_agent!(name)
      klass = agent_class!(name)
      resolver = resolver!(name)
      resolver.destroy(klass)
      {ok: true}
    end

    private

    def agent_attributes!(name)
      name = agent_name!(name)
      LLM::Object.from(roda_class.registry[name])
    end

    def agent_class!(name)
      name = agent_name!(name)
      agent_attributes!(name)[:class]
    end

    def agent_resolver!(name)
      name = agent_name!(name)
      agent_attributes!(name).resolver
    end

    def agent_stream!(name)
      name = agent_name!(name)
      agent_attributes!(name).stream || LLM::Roda::Stream
    end

    def agent_name!(name)
      (LLM::Agent === name and name.name) or
      (name.respond_to?(:agent) and name.agent.name) or
      (name)
    end

    def resolver!(name)
      name = agent_name!(name)
      agent_resolver!(name).new(scope, self)
    end
  end
end
