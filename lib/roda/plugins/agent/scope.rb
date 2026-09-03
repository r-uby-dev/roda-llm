# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  ##
  # The {Roda::RodaPlugins::Agent::Scope Scope} class defines
  # the interface that a scope must provide to store and
  # retrieve agents. A scope is responsible for answering
  # "where does an agent live?" for a given agent class:
  # in a session, shared globally, or somewhere custom.
  #
  # A scope is constructed with the Roda app, so subclasses
  # can reach anything on the app (e.g. the session).
  #
  # @abstract Subclasses must implement {#find}, {#find!},
  #   {#create} and {#destroy}.
  class Scope
    ##
    # @param [Roda] app
    #  The app instance that owns this scope.
    # @return [Scope]
    def initialize(app)
      @app = app
    end

    ##
    # Find the agent for the current context (nil if none).
    #
    # @param [Class(LLM::Agent)] klass
    #  The agent class to look up.
    # @return [LLM::Agent, nil]
    def find(klass)
      raise NotImplementedError
    end

    ##
    # Find the agent for the current context, or raise if
    # no agent is bound.
    #
    # @param [Class(LLM::Agent)] klass
    #  The agent class to look up.
    # @return [LLM::Agent]
    def find!(klass)
      raise NotImplementedError
    end

    ##
    # Create a new agent and bind it to the current context.
    #
    # @param [Class(LLM::Agent)] klass
    #  The agent class to create.
    # @return [LLM::Agent]
    def create(klass)
      raise NotImplementedError
    end

    ##
    # Destroy the agent bound to the current context, if
    # any, and unbind it.
    #
    # @param [Class(LLM::Agent)] klass
    #  The agent class whose bound instance should be destroyed.
    # @return [void]
    def destroy(klass)
      raise NotImplementedError
    end

    ##
    # No-op by default.
    # Enable with the `csrf_check` plugin.
    # @return [void]
    def check_csrf!
      @app.check_csrf! if @app.respond_to?(:check_csrf!)
    end

    private

    ##
    # @return [Hash]
    def session
      @app.session
    end

    ##
    # @return [Rack::Request]
    def request
      @app.request
    end
  end
end
