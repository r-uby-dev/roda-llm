# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  ##
  # The {Roda::RodaPlugins::Agent::Resolver Resolver} class defines
  # the interface that a resolver must provide to store, retrieve
  # and create agents. A resolver is responsible for answering
  # "how do I turn this agent class into a talkable agent?" for a
  # given agent class: from a session, shared globally, or somewhere
  # custom.
  #
  # A resolver is constructed with the Roda application instance and
  # the request being served, and both are available as readers. The
  # session is reached through `roda`, because it belongs to the app
  # rather than the resolver.
  #
  # @abstract Subclasses must implement {#find}, {#create}
  #   and {#destroy}.
  class Resolver
    ##
    # @return [Roda]
    #  The Roda application instance.
    attr_reader :roda

    ##
    # @return [Roda::RodaRequest]
    #  The request being served.
    attr_reader :request

    ##
    # @param [Roda] roda
    #  The Roda application instance.
    # @param [Roda::RodaRequest] request
    #  The request being served.
    # @return [Resolver]
    def initialize(roda, request)
      @roda = roda
      @request = request
    end

    ##
    # The parameters of the request (query string and body).
    # @return [Hash]
    def params
      request.params
    end

    ##
    # Find the agent for the current context (nil if none).
    # @param [Class(LLM::Agent)] klass
    #  The agent class to look up.
    # @return [LLM::Agent, nil]
    def find(klass)
      raise NotImplementedError
    end

    ##
    # Create a new agent and bind it to the current context.
    # @param [Class(LLM::Agent)] klass
    #  The agent class to create.
    # @return [LLM::Agent]
    def create(klass)
      raise NotImplementedError
    end

    ##
    # Destroy the agent bound to the current context, if
    # any, and unbind it.
    # @param [Class(LLM::Agent)] klass
    #  The agent class whose bound instance should be destroyed.
    # @return [void]
    def destroy(klass)
      raise NotImplementedError
    end

    ##
    # No-op by default.
    # Enable with the `route_csrf` plugin.
    # @return [void]
    def check_csrf!
      roda.check_csrf! if roda.respond_to?(:check_csrf!)
    end
  end
end
