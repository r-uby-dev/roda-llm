# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "roda-llm"
  spec.version = "0.1.0"
  spec.authors = ["Robert Gleeson"]
  spec.email = ["robert@r.uby.dev"]

  spec.description = <<~DESCRIPTION
  roda-llm is a Roda plugin that provides a framework for deploying
  multiple llm.rb agents within your Roda, Rack or Rails application.
  DESCRIPTION
  spec.summary = spec.description

  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.3.0"

  spec.homepage = "https://r.uby.dev"
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/r-uby-dev/roda-llm"

  spec.files = Dir[
    "README.md",
    "LICENSE",
    "roda-llm.gemspec",
    "lib/**/*.rb",
    "public/**/*"
  ]
  spec.require_paths = ["lib"]

  spec.add_dependency "roda", "~> 3.85"
  spec.add_dependency "roda-sse", "~> 0.3"
  spec.add_dependency "llm.rb", "~> 15.2"

  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rack-test", "~> 2.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "standard", "~> 1.50"
  spec.add_development_dependency "activerecord", "~> 8.1"
end
