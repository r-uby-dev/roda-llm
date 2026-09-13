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
  # One is built for each request, and everything that needs it in that
  # request shares it: the instance that finds or creates an agent is the
  # instance that finalizes its turn, so a resolver can carry what it
  # learned from the first call to the second. It lives no longer than the
  # request, so it still reads what it needs from `roda`, `request` or
  # `params` rather than expecting to be kept.
  #
  # @abstract Subclasses must implement {#find}, {#create}
  #   and {#destroy}, and may implement {#finalize}.
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
    # Check the request's CSRF token. The agent plugin loads
    # `:route_csrf` with the routes, so this is a real check
    # rather than an invitation to add one. GET is named in the
    # methods to check because the describe route is a read of
    # the visitor's own conversation, and the plugin leaves safe
    # methods alone by default.
    # @return [void]
    def check_csrf!
      roda.check_csrf!(check_request_methods: %w[GET POST DELETE PATCH PUT])
    end

    ##
    # Called once a turn is done, with the agent that made it and the
    # response it produced. The plugin has finished with both by then, so
    # this is where a resolver writes down what the conversation came to -
    # a transcript, a cache, a row of its own. A turn that raises never
    # gets here.
    #
    # No-op by default.
    # @param [LLM::Agent] agent
    # @param [LLM::Response] res
    # @return [void]
    def finalize(agent, res)
    end
  end
end
