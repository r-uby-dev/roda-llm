# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  module Operations
    def create!(name)
      klass = agent_class!(name)
      ##
      # 'self.scope' is resolved to an instance of Roda.
      scope = agent_scope!(name).new(self.scope)
      agent = scope.find(klass) || scope.create(klass)
      {ok: true, id: agent.id}
    end

    def update!(name, params, sse)
      klass = agent_class!(name)
      ##
      # 'self.scope' is resolved to an instance of Roda.
      scope = agent_scope!(name).new(self.scope)
      stream = agent_stream!(name).new(sse).tap(&:hello)
      agent = scope.find!(klass)
      res = agent.talk(params["q"], stream:)
      stream&.goodbye(res:)
    rescue ActiveRecord::RecordNotFound
      stream&.error(message: "agent unavailable")
    rescue
      stream&.error(message: "internal server error")
    end

    def destroy!(name)
      klass = agent_class!(name)
      ##
      # 'self.scope' is resolved to an instance of Roda.
      scope = agent_scope!(name).new(self.scope)
      scope.destroy(klass)
      {ok: true}
    end

    private

    def agent_attributes!(name)
      LLM::Object.from(LLM::Roda.registry[name])
    end

    def agent_class!(name)
      agent_attributes!(name)[:class]
    end

    def agent_scope!(name)
      agent_attributes!(name).scope
    end

    def agent_stream!(name)
      agent_attributes!(name).stream || LLM::Roda::Stream
    end
  end
end
