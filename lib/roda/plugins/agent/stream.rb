# frozen_string_literal: true

module Roda::RodaPlugins::Agent
  ##
  # This class implements a stream over Server-Side
  # Events (SSE). As such it is one way: the server
  # can notify the client but the client cannot communicate
  # with the server (other than via a separate HTTP request).
  class Stream < LLM::Stream
    ##
    # @param [#write] io
    #  An object that can be written to
    # @return [Stream]
    def initialize(io)
      @io = io
    end

    ##
    # This callback is called when a stream is about to start.
    # @return [void]
    def hello
    end

    ##
    # This callback is called when a stream is finished.
    # @param [LLM::Response] res
    #  A response object.
    # @return [void]
    def goodbye(res:)
    end

    ##
    # This callback is called when a stream receives a chunk.
    # @param [String] text
    # @return [void]
    def on_content(text)
      emit("content", text:)
    end

    ##
    # This callback is called when a tool call is received.
    # @param [LLM::Function] tool
    # @return [void]
    def on_tool_call(tool)
      emit("tool_call", id: tool.id, name: tool.name, arguments: tool.arguments.to_h)
    end

    ##
    # This callback is called when a tool call returns.
    # @param [LLM::Function] tool
    # @param [LLM::Function::Return] result
    # @return [void]
    def on_tool_return(tool, result)
      emit("tool_return", id: tool.id, name: tool.name, ok: !result.error?)
    end

    ##
    # Emits an error
    # @return [void]
    def error(message:)
      emit("failed", error: message)
    end

    private

    def emit(type, payload)
      @io.write("event: #{type}\ndata: #{LLM.json.dump(payload)}\n\n")
    end
  end
end