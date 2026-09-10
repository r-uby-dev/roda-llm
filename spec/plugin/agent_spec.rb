# frozen_string_literal: true

require "setup"
require "rack/mock"

RSpec.describe LLM::Roda do
  let(:theo) { Class.new(LLM::Agent) { set name: "theo" } }
  let(:other) { Class.new(LLM::Agent) { set name: "other" } }
  let(:agent_class) { theo }
  let(:resolver) { LLM::Roda::Resolver::Session }
  let(:agents) { [{class: agent_class, resolver:}] }
  let(:app) do
    app = Class.new(Roda)
    app.plugin :agent, agents: agents
    app
  end

  describe ".registry" do
    it "keys the agent by name" do
      expect(app.registry.keys).to eq(["theo"])
    end

    it "stores the resolver class it was given" do
      expect(app.registry["theo"][:resolver]).to eq(LLM::Roda::Resolver::Session)
    end

    context "when the agent is a plain LLM::Agent subclass" do
      it "stores the agent's class" do
        expect(app.registry["theo"][:class]).to be(theo)
      end
    end

    context "when the agent is reached through .agent" do
      let(:agent_class) do
        theo_class = theo
        Class.new do
          define_singleton_method(:agent) { theo_class }
        end
      end

      it "keys the agent by the agent's name" do
        expect(app.registry.keys).to eq(["theo"])
      end

      it "stores the class it was given" do
        expect(app.registry["theo"][:class]).to be(agent_class)
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

      it "is owned by the subclass" do
        expect(subclass.registry).not_to be(app.registry)
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
    let(:app) do
      app = Class.new(Roda)
      app.plugin :agent, agents: agents
      app.route { |r| r.agent! }
      app
    end

    let(:agent_class) do
      Class.new(LLM::Agent) do
        set name: "theo"
        def self.id = 1
      end
    end

    let(:resolver) do
      Class.new(LLM::Roda::Resolver) do
        def find(_klass) = nil
        def find!(klass) = klass
        def create(klass) = klass
        def destroy(_klass) = nil
      end
    end

    let(:response) { Rack::MockRequest.new(app).post("/agents/theo") }

    context "when a POST creates an agent" do
      it "responds successfully" do
        expect(response.status).to eq(200)
      end

      it "responds with the agent's id" do
        expect(LLM.json.load(response.body)).to eq({"ok" => true, "id" => 1})
      end
    end
  end
end
