# frozen_string_literal: true

require "setup"
require "roda/llm/rake/migrations"

RSpec.describe LLM::Roda::Rake::Migrations do
  subject(:migrations) { described_class }

  describe ".change_method" do
    context "when the name creates a table" do
      subject(:body) { migrations.change_method("create_users") }

      it "includes create_table" do
        expect(body).to include("create_table :users")
      end

      it "includes timestamps" do
        expect(body).to include("t.timestamps")
      end
    end

    context "when the name adds a column" do
      subject(:body) { migrations.change_method("add_name_to_users") }

      it "includes add_column" do
        expect(body).to include("add_column :users, :name")
      end
    end

    context "when the name is unknown" do
      subject(:body) { migrations.change_method("bump") }

      it "falls back to an empty change" do
        expect(body).to include("add your migration steps here")
      end
    end
  end

  describe ".generate" do
    let(:dir) { Dir.mktmpdir }
    let(:name) { "create_posts" }
    subject(:path) { migrations.generate(name) }

    before { allow(migrations).to receive(:directory).and_return(dir) }
    after { FileUtils.remove_entry(dir) }

    it "writes a timestamped migration" do
      expect(path).to match(%r{\d+_create_posts\.rb\z})
    end

    it "scaffolds the table body" do
      expect(File.read(path)).to include("create_table :posts")
    end

    context "when the name is invalid" do
      let(:name) { "Bad Name" }

      it "raises ArgumentError" do
        expect { migrations.generate(name) }.to raise_error(ArgumentError)
      end
    end
  end
end
