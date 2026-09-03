# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  ##
  # The {Roda::RodaPlugins::Agent::Scope::Session Session} scope
  # stores one agent per visitor session. The agent's id lives
  # under a per-class key in the Roda session, so different
  # agent classes stay separate within the same session.
  class Scope::Session < Scope
    ##
    # Find the agent bound to this session, or nil.
    #
    # @param [Class(LLM::Agent)] klass
    # @return [LLM::Agent, nil]
    def find(klass)
      klass.find_by(id: session[key!(klass)])
    end

    ##
    # Find the agent bound to this session, or raise if
    # none is bound.
    #
    # @param [Class(LLM::Agent)] klass
    # @return [LLM::Agent]
    def find!(klass)
      klass.find(session[key!(klass)])
    end

    ##
    # Create an agent and bind it to this session.
    #
    # @param [Class(LLM::Agent)] klass
    # @return [LLM::Agent]
    def create(klass)
      klass.create!.tap { session[key!(klass)] = it.id }
    end

    ##
    # Destroy the agent bound to this session, if any,
    # and unbind it.
    #
    # @param [Class(LLM::Agent)] klass
    # @return [void]
    def destroy(klass)
      klass.find_by(id: session[key!(klass)])&.destroy
      session.delete(key!(klass))
    end

    private

    ##
    # @param [Class(LLM::Agent)] klass
    # @return [String]
    def key!(klass)
      "agent_id:#{klass.agent.name}"
    end
  end
end
