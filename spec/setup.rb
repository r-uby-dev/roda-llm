# frozen_string_literal: true

require "roda-llm"
require "fileutils"
require "stringio"
require "tmpdir"

RSpec.configure do |config|
  config.disable_monkey_patching!
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
end
