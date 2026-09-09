<p align="center">
  <a href="https://r.uby.dev">
    <img
      src="rubydev.svg"
      width="400"
      height="200"
      border="0"
      alt="a r.uby.dev project"
     >
  </a>
</p>

> [r.uby.dev](https://r.uby.dev/llm) project.

Welcome to the canonical llm-roda repository.

llm-roda is a [Roda](https://roda.jeremyevans.net) plugin that
provides a framework for deploying multiple llm.rb agents within
your Roda, Rack or Rails application. The HTTP endpoints are
provided via a Roda app that can be mounted within your own
Rack/Rails app. It makes it trivial to deploy multiple agents
at scale while letting you focus on the code that makes your
agent useful rather than the glue that makes it functional.

The plugin also includes a web component that can be used
to provide a web interface to an llm.rb agent. The web component
is highly configurable - for example, you can define how tool calls
render in the status bar. It is also written in vanilla JavaScript
and uses technology that is builtin to the browser. The javascript
asset can be installed into your application via a builtin rake
task.

An agent is implemented as an ActiveRecord model that you own.
It would also be possible to support Sequel but for now the project
is focused on using ActiveRecord for the persistence layer. For Rack
and Roda applications rake tasks are provided that can support you
in setting up ActiveRecord within a non-Rails setting. In a Rails
setting, it is managed by the Rails framework.

## Install

```bash
gem install roda-llm
```

## Quick start

##### Rakefile

```ruby
##
# Add the following to your Rakefile for tasks
# that manage assets, and ActiveRecord. The
# ActiveRecord tasks are intended for non-Rails
# settings.
#
# The ActiveRecord tasks expect config/database.yml
# to exist and have database settings scoped per
# environment (standard Rails style).
require "roda/llm/rake/assets"
require "roda/llm/rake/active_record"
```

The available tasks:

    rake roda:llm:assets:install  # install the web component into the host application
    rake roda:llm:db:create       # create the database
    rake roda:llm:db:migrate      # run pending migrations (creating the database first if needed)
    rake roda:llm:db:rollback     # rollback the most recent migration
    rake roda:llm:db:status       # show migration status

##### agent.rb

```ruby
require "roda"
require "roda-llm"

class Theo < ActiveRecord::Base
  acts_as_agent do |agent|
    agent.set name: "theo",
              description: "a chatbot for the 4.4bsd.dev website",
              instructions: proc { File.read("prompt.md") },
              tools: :tools
  end

  private

  def set_provider
    LLM.deepseek
  end

  def tools
    [Theo::Tools::ReadMan, Theo::Tools::SearchMan]
  end
end
```

##### config.ru

```ruby
class App < Roda
  plugin :sessions, secret: ENV["SESSION_SECRET"]
  plugin :route_csrf, check_header: true
  plugin :agent, agents: [{class: Theo, scope: :session}]

  route do |r|
    r.agent!
    r.root { "hello" }
  end
end
run App
```

##### index.erb

The `<agent>` web component can render a console that you can use
to talk to agent. The console can be rendered-server side, so
you can prepopulate the content of the console with a greeting
or initial state without waiting for JavaScript to settle.

The console can also be configured through various different
attributes, and slots. This approach is agnostic to where it
is deployed: it works the same in Rails, Rack, and Roda:

```html
<agent path="/agents/theo">
  <div slot="greeting">
    <p>Hi! Ask me anything about the 4.4BSD manual.</p>
  </div>
  <span slot="label.read-man.text">Reading man page {arguments.name}</span>
  <span slot="label.read-man.done">Read {count} man pages</span>
  <span slot="label.*.text">Running {name}…</span>
  <span slot="label.*.done">Done</span>
</agent>
```

<details>
<summary>Routes</summary>
<br>

The default routes:

| Method | Path | Behaviour |
|---|---|---|
| `POST`   | `/agents/<name>`       | create an agent of that class |
| `GET`    | `/agents/<name>?q=...`  | talk to the agent (SSE stream) |
| `DELETE` | `/agents/<name>`       | destroy the bound agent |

</details>

<details>
<summary>Scopes</summary>
<br>

A scope lets you implement different backends for the
discovery, creation and destruction of agents. The default
scope implements a backend that is tied to a user's session
and it can work for guest users as well. This feature gives
users of the plugin control over how an agent is found, created
and destroyed.

[`LLM::Roda::Scope`](lib/roda/plugins/agent/scope.rb) is the abstract interface:
subclasses implement `find`, `find!`, `create` and `destroy`, and can
reach the app through the private `session` and `request` helpers. An
example of a custom scope binding an agent to the authenticated user
instead of the user's session:

```ruby
##
# Custom scope: one agent per signed-in user.
class UserScope < LLM::Roda::Scope
  ##
  # @return [LLM::Agent, nil]
  def find(klass)
    klass.find_by(user: current_user)
  end

  ##
  # @raise [ActiveRecord::RecordNotFound]
  # @return [LLM::Agent]
  def find!(klass)
    klass.find_by!(user: current_user)
  end

  ##
  # @return [LLM::Agent]
  def create(klass)
    klass.create!(user: current_user)
  end

  ##
  # @return [void]
  def destroy(klass)
    find(klass)&.destroy
  end

  private

  ##
  # An authenticated user bound to the current request.
  #
  # @return [User]
  def current_user
    @app.session[:user_id] && User.find(@app.session[:user_id])
  end
end

class App < Roda
  plugin :agent, agents: [{class: Theo, scope: UserScope}]
end
run App
```

</details>

<details>
<summary>Streams</summary>
<br>

[`LLM::Roda::Stream`](lib/roda/plugins/agent/stream.rb) is a subclass
of `LLM::Stream` and it is specialized in streaming over Server Side
Events (SSE). It supports all the same callbacks that `LLM::Stream`
supports and it has two unique methods: `hello` and `goodbye`. It is
not neccessary to implement either but all stream methods can be
overriden.

A custom stream can subclass it and override just the parts you need:

```ruby
class Theo::Stream < LLM::Roda::Stream
  def on_reasoning_content(content)
    ##
    # By default roda-llm does not implement this hook.
    # It is a noop. A custom stream could implement it.
    log(content)
  end

  def goodbye(res:)
    ##
    # 'res' is the final response after
    # a turn. It references an instance
    # of LLM::Response.
    super
    log(res)
  end
end

class App < Roda
  plugin :agent, agents: [{class: Theo, stream: Theo::Stream}]
end
run App
```

</details>

<details>
<summary>Operations</summary>
<br>

The [Operations](lib/roda/plugins/agent/operations.rb) module is a
RequestMethods mixin. The plugin's `RequestMethods` includes it, so the
three lifecycle verbs (`create_agent!`, `update_agent!` and `destroy_agent!`)
run on the request and are available inside the route block. Each resolves the
registered agent class and its scope via the `registry`, builds a scope
for the current Roda request (`self.scope`), and performs the action.
The routes declared by `r.agent!` call these verbs and usually you would
not call them directly.

```ruby
route do |r|
  post(true) { r.create_agent!("Theo") }
  delete(true) { r.destroy_agent!("Theo") }
end
```

</details>

<details>
<summary>Registry</summary>
<br>

[`LLM::Roda.registry`](lib/roda/plugins/agent.rb) maps an agent's
`LLM::Agent#name` (e.g. `"Theo"`) to its class, stream and scope,
wrapped as `LLM::Object`s. It is populated by `plugin :agent`, and
keyed by the agent name. An agent's name can be defined through the
`agent.set name: "..."` method, otherwise it is inferred from the
class name of the agent.

</details>

## License

MIT
