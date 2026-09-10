# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "roda-llm"
  spec.version = "0.1.0"
  spec.authors = ["Robert Gleeson"]
  spec.email = ["robert@r.uby.dev"]

  spec.summary = "A Roda plugin for managing llm.rb agents"
  spec.description = <<~DESCRIPTION
    roda-llm is a Roda plugin that deploys one or more llm.rb agents as a
    fleet exposed under a single URL namespace. It provides the routes,
    request helpers, resolvers and SSE streaming glue so applications can
    focus on writing agents instead of the machinery that wires them up.
  DESCRIPTION

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
  spec.add_dependency "llm.rb", "~> 15.1"

  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "standard", "~> 1.50"
  spec.add_development_dependency "activerecord", "~> 8.1"
end
