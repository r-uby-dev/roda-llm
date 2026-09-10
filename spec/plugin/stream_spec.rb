# frozen_string_literal: true

require "setup"

RSpec.describe LLM::Roda::Stream do
  let(:io) { StringIO.new }
  let(:stream) { described_class.new(io) }
  let(:tool) do
    double("tool", id: "call_1", name: "read-man",
                   arguments: double(to_h: {"q" => "date"}))
  end
  let(:fnreturn) { double("fnreturn", error?: false) }

  describe "#hello" do
    it "writes the connected comment" do
      stream.hello
      expect(io.string).to eq(": connected\n\n")
    end
  end

  describe "#goodbye" do
    let(:res) { double("res", content: "bye") }

    it "emits the final answer" do
      stream.goodbye(res:)
      expect(io.string).to eq("event: onGoodbye\ndata: {\"answer\":\"bye\"}\n\n")
    end
  end

  describe "#on_content" do
    it "emits an onContent event" do
      stream.on_content("hi")
      expect(io.string).to eq("event: onContent\ndata: {\"text\":\"hi\"}\n\n")
    end
  end

  describe "#on_tool_call" do
    it "emits id, name and arguments" do
      stream.on_tool_call(tool)
      expect(io.string).to eq(
        "event: onToolCall\ndata: {\"id\":\"call_1\",\"name\":\"read-man\",\"arguments\":{\"q\":\"date\"}}\n\n"
      )
    end
  end

  describe "#on_tool_return" do
    it "emits the return" do
      stream.on_tool_return(tool, fnreturn)
      expect(io.string).to eq(
        "event: onToolReturn\ndata: {\"id\":\"call_1\",\"name\":\"read-man\",\"error\":false}\n\n"
      )
    end
  end

  describe "#error" do
    it "emits an onError event" do
      stream.error(message: "boom")
      expect(io.string).to eq("event: onError\ndata: {\"error\":\"boom\"}\n\n")
    end
  end

  context "when a subclass overrides callbacks" do
    let(:tracking_stream) do
      Class.new(described_class) do
        attr_reader :events

        def initialize(io)
          super
          @events = []
        end

        def on_content(text)
          @events << text
          super
        end
      end
    end
    let(:stream) { tracking_stream.new(io) }

    it "still emits after the override" do
      stream.on_content("hi")
      expect(stream.events).to eq(["hi"])
    end

    it "writes the underlying event" do
      stream.on_content("hi")
      expect(io.string).to eq("event: onContent\ndata: {\"text\":\"hi\"}\n\n")
    end
  end
end
