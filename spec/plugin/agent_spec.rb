# frozen_string_literal: true

require "setup"
require "rack/test"

RSpec.describe LLM::Roda do
  include Rack::Test::Methods

  let(:theo) do
    Class.new(LLM::Agent) do
      set name: "theo"
      def id = 1

      def talk(prompt, stream: nil)
        stream&.on_content(prompt)
        LLM::Object.from(content: prompt)
      end
    end
  end

  let(:other) do
    Class.new(LLM::Agent) do
      set name: "other"
      def id = 2

      def talk(prompt, stream: nil)
        LLM::Object.from(content: "other: #{prompt}")
      end
    end
  end

  let(:resolver) do
    Class.new(LLM::Roda::Resolver) do
      def find(klass) = klass.new(LLM.openai(key: "test"))
      def create(klass) = klass.new(LLM.openai(key: "test"))
      def destroy(_klass) = nil
    end
  end

  let(:agent_class) { theo }
  let(:agents) { [{class: agent_class, resolver:}] }
  let(:app) do
    app = Class.new(Roda)
    app.plugin(:agent, agents:)
    app.route { |r| r.agent! }
    app
  end

  describe ".registry" do
    it "keys the agent by name" do
      expect(app.registry.keys).to eq(["theo"])
    end

    it "stores the resolver class it was given" do
      expect(app.registry["theo"][:resolver]).to eq(resolver)
    end

    context "when the agent is a plain LLM::Agent subclass" do
      it "stores the agent's class" do
        expect(app.registry["theo"][:class]).to be(theo)
      end
    end

    context "when no agent is declared" do
      let(:agents) { [] }

      it "is empty" do
        expect(app.registry).to eq({})
      end
    end

    context "when another app is configured" do
      let(:other_app) do
        app = Class.new(Roda)
        app.plugin :agent, agents: [{class: other, resolver:}]
        app
      end

      before { other_app }

      it "does not include the other app's agents" do
        expect(app.registry.keys).to eq(["theo"])
      end

      it "does not include this app's agents" do
        expect(other_app.registry.keys).to eq(["other"])
      end
    end

    context "when the app is subclassed" do
      let(:subclass) { Class.new(app) }

      it "is inherited by the subclass" do
        expect(subclass.registry.keys).to eq(["theo"])
      end
    end

    context "when the subclass declares its own agent" do
      let(:subclass) do
        subclass = Class.new(app)
        subclass.plugin :agent, agents: [{class: other, resolver:}]
        subclass
      end

      it "stores the agent the subclass declares" do
        expect(subclass.registry.keys).to eq(["other"])
      end

      it "does not change the app it inherits from" do
        expect(app.registry.keys).to eq(["theo"])
      end
    end

    context "when the app is frozen" do
      before { app.freeze }

      it "stays readable" do
        expect(app.registry.keys).to eq(["theo"])
      end
    end
  end

  describe "#agent!" do
    let(:body) { last_response.instance_variable_get(:@body) }
    let(:stream) { double(write: nil, close_write: nil) }
    let(:json) { LLM.json.load(last_response.body) }

    describe "POST /agents/:name" do
      before { post "/agents/theo" }

      it "includes the agent's id" do
        expect(json).to eq({"ok" => true, "id" => 1})
      end
    end

    describe "GET /agents/:name" do
      before do
        post "/agents/theo"
        get "/agents/theo", q: "hi"
      end

      it "streams the agent's answer" do
        body.call(stream)
        expect(stream).to have_received(:write).with(%(event: onGoodbye\ndata: {"answer":"hi"}\n\n))
      end

      context "when the agent declares a stream" do
        let(:stream_class) do
          Class.new(LLM::Roda::Stream) do
            def goodbye(res:) = emit("onAnswer", answer: res.content)
          end
        end
        let(:agents) { [{class: agent_class, resolver:, stream: stream_class}] }

        it "streams through the declared stream" do
          body.call(stream)
          expect(stream).to have_received(:write).with(%(event: onAnswer\ndata: {"answer":"hi"}\n\n))
        end
      end

      context "when the app serves two agents" do
        let(:agents) do
          [{class: theo, resolver:}, {class: other, resolver:}]
        end

        before { get "/agents/other", q: "hi" }

        it "streams the answer of the agent named in the path" do
          body.call(stream)
          expect(stream).to have_received(:write).with(%(event: onGoodbye\ndata: {"answer":"other: hi"}\n\n))
        end
      end
    end

    context "when the resolver has no agent" do
      let(:resolver) do
        Class.new(LLM::Roda::Resolver) do
          def find(_klass) = nil
          def create(klass) = klass.new(LLM.openai(key: "test"))
        end
      end

      it "creates the agent" do
        post "/agents/theo"
        expect(json).to eq({"ok" => true, "id" => 1})
      end

      it "talks to an agent that has not been created yet" do
        get "/agents/theo", q: "hi"
        body.call(stream)
        expect(stream).to have_received(:write).with(%(event: onGoodbye\ndata: {"answer":"hi"}\n\n))
      end
    end

    context "when the agent raises" do
      let(:agent_class) do
        Class.new(LLM::Agent) do
          set name: "theo"
          def talk(*) = raise("boom")
        end
      end

      it "streams an error" do
        get "/agents/theo", q: "hi"
        body.call(stream)
        expect(stream).to have_received(:write).with(%(event: onError\ndata: {"error":"internal server error"}\n\n))
      end
    end

    describe "DELETE /agents/:name" do
      before { delete "/agents/theo" }

      it "responds with ok" do
        expect(json).to eq({"ok" => true})
      end
    end
  end
end
