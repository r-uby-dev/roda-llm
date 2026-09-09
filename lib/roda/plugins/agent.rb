# frozen_string_literal: true

module Roda::RodaPlugins
  module Agent
    require "erubi/capture_block"
    require_relative "agent/operations"
    require_relative "agent/scope"
    require_relative "agent/scope/session"
    require_relative "agent/stream"

    extend self

    DEFAULTS = {path: "agents", scope: :session}.freeze
    SCOPES = {session: Scope::Session}.freeze

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
      app.plugin :h
      app.plugin :render, template_opts: {engine_class: Erubi::CaptureBlockEngine}
      app.plugin :capture_erb
    end

    ##
    # @param [Roda] _app
    # @param [Hash] options
    # @return [void]
    def configure(_app, options)
      options = DEFAULTS.merge(options)
      @path = options[:path]
      options[:agents].each do |agent|
        scope = SCOPES[agent[:scope]] || agent[:scope]
        key = agent[:class].agent.name
        registry[key] = LLM::Object.from agent.slice(:class, :stream).merge!(scope:)
      end
    end

    ##
    # @return [Hash]
    def registry
      @registry ||= {}
    end

    ##
    # @return [String]
    def path
      @path
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
        path = LLM::Roda.path
        on(path) do
          on String do |name|
            post(true)   { [agent_scope!(name).new(self).check_csrf!, create_agent!(name)].last }
            sse          { |sse| update_agent!(name, params, sse) }
            delete(true) { [agent_scope!(name).new(self).check_csrf!, destroy_agent!(name)].last }
          end
        end
      end
    end

    module InstanceMethods
      ##
      # Renders an <agent> web component in a template. The block
      # provides the light-DOM children (label slots, greeting, ...)
      # as plain markup. The attributes are escaped with `h`: the
      # block content is authored markup and passes through as-is.
      #
      # = Example
      #
      #   <%= agent!(path: "/agents/foo") do %>
      #     <span slot="label.man.text">Reading man pages</span>
      #     <span slot="label.man.done">Read {count} man pages</span>
      #   <% end %>
      #
      # @return [String]
      def agent!(opts = OPTS, &block)
        attrs = opts.map { |key, value| " #{h(key)}=\"#{h(value)}\"" }.join
        "<agent#{attrs}>#{capture_erb(&block)}</agent>"
      end
    end
  end
  register_plugin(:agent, Agent)
end

module LLM
  Roda = Roda::RodaPlugins::Agent
end
