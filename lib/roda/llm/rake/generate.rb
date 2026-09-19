# frozen_string_literal: true

require "erb"
require "fileutils"
require "rake"

module LLM
end unless defined?(LLM)

module LLM::Roda
  module Rake
  end

  module Rake::Generate
    extend self
    include FileUtils

    ##
    # What a name has to be to be usable: it is the agent's name, the
    # directory it keeps its prompt in, the directory its views are in, the
    # path it is served at and the key its session is stored under, and the
    # constant is derived from it.
    NAME = /\A[a-z][a-z0-9_]*\z/

    ##
    # Where the templates live. Each is named for the file it produces, with
    # .tt on the end - the name Thor gives a template, and Rails' generators
    # with it - so tools.erb.tt writes tools.erb.
    TEMPLATES = File.expand_path("../generators/agent", __dir__)

    ##
    # A template, and where it goes. The name in the path is the agent's.
    FILES = {
      "agent.rb.tt" => "app/agents/%{name}.rb",
      "prompt.md.tt" => "app/agents/%{name}/prompt.md",
      "about.erb.tt" => "app/views/agents/%{name}/about.erb",
      "placeholder.erb.tt" => "app/views/agents/%{name}/placeholder.erb",
      "tools.erb.tt" => "app/views/agents/%{name}/tools.erb",
      "did_you_know.erb.tt" => "app/views/agents/%{name}/did_you_know.erb"
    }

    ##
    # Writes an agent, its instructions and its views into the host app.
    # @param [String] name
    # @param [String] root
    #  The host application, defaulting to where the task was run.
    # @return [Array<String>]
    #  The paths written.
    def agent(name:, root: Dir.pwd)
      name = name.to_s
      unless name.match?(NAME)
        abort "an agent name is lowercase letters, digits and underscores: #{name.inspect}"
      end
      const = name.split("_").map(&:capitalize).join
      {name:, const:}.then do |locals|
        paths = FILES.to_h { |template, to| [format(to, name:), template] }
        clobber = paths.keys.select { File.exist?(File.join(root, _1)) }
        unless clobber.empty?
          abort "already there, and not overwritten:\n  #{clobber.join("\n  ")}"
        end
        paths.map do |path, template|
          target = File.join(root, path)
          mkdir_p(File.dirname(target))
          File.write(target, render(template, **locals))
          path
        end
      end
    end

    private

    ##
    # A template, rendered. A .tt is ERB by convention, and these are given
    # the agent's name and the constant derived from it.
    def render(template, name:, const:)
      ERB.new(File.read(File.join(TEMPLATES, template)), trim_mode: "-").result(binding)
    end
  end
end

namespace :'roda:llm:g' do
  desc "generate an agent: its class, its prompt, and its views"
  task :agent, [:name] do |_task, args|
    written = LLM::Roda::Rake::Generate.agent(name: args[:name])
    puts "ok:"
    written.each { |path| puts "  #{path}" }
    puts
    puts "add it to the registry in app/routes/application.rb, and put its"
    puts "icon at public/images/agents/#{args[:name]}.svg."
  end
end
