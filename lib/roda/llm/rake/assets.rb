# frozen_string_literal: true

require "fileutils"
require "rake"

module LLM
end unless defined?(LLM)

module LLM::Roda
  module Rake
  end

  module Rake::Assets
    extend self
    include FileUtils

    ##
    # @return [String]
    #  The built web component bundled in the gem.
    def source
      gem = Gem.loaded_specs["roda-llm"]
      root = gem ? gem.full_gem_path : File.expand_path("../../../..", __dir__)
      File.join(root, "public", "roda-llm", "web-component.js")
    end

    ##
    # @return [String]
    #  Where the web component should live in the host app.
    def target
      File.join(Dir.pwd, "public", "roda-llm", "web-component.js")
    end

    ##
    # Installs the web component into the host application.
    # @return [String]
    #  The path where asset was installed
    def install
      if not File.file?(source)
        abort "roda-llm web component not found: #{source}"
      end
      mkdir_p(File.dirname(target))
      cp(source, target)
      target.sub("#{Dir.getwd}/", "")
    end
  end
end

namespace :'roda:llm:assets' do
  desc "install the web component into the host application"
  task :install do
    puts "ok: #{LLM::Roda::Rake::Assets.install}"
  end
end
