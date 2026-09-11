# frozen_string_literal: true

require "setup"
require "roda/llm/rake/assets"

RSpec.describe LLM::Roda::Rake::Assets do
  subject(:assets) { described_class }

  describe ".source" do
    subject(:source) { assets.source }

    it "points at the bundled console element" do
      expect(source).to end_with("public/roda-llm/htmlelement.js")
    end

    it "exists in the gem" do
      expect(File.file?(source)).to be(true)
    end
  end

  describe ".target" do
    let(:dir) { Dir.mktmpdir }
    subject(:target) { assets.target }

    before { allow(Dir).to receive(:pwd).and_return(dir) }
    after { FileUtils.remove_entry(dir) }

    it "resolves under the host public directory" do
      expect(target).to eq(File.join(dir, "public", "roda-llm", "htmlelement.js"))
    end
  end

  describe ".install" do
    let(:dir) { Dir.mktmpdir }
    let(:installed) { File.join(dir, "public", "roda-llm", "htmlelement.js") }

    before { allow(Dir).to receive(:pwd).and_return(dir) }
    after { FileUtils.remove_entry(dir) }

    it "copies the bundled asset into the host public directory" do
      assets.install
      expect(File.file?(installed)).to be(true)
    end

    it "copies the exact bytes of the source" do
      assets.install
      expect(File.binread(installed)).to eq(File.binread(assets.source))
    end

    context "when the source is missing" do
      before { allow(assets).to receive(:source).and_return(File.join(dir, "missing.js")) }

      it "aborts" do
        expect { assets.install }.to raise_error(SystemExit)
      end
    end
  end
end
