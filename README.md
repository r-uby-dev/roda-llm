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

> A [r.uby.dev](https://r.uby.dev/llm) project.

Welcome to the canonical llm-roda repository.

llm-roda is a [Roda](https://roda.jeremyevans.net) plugin that deploys
one or more [llm.rb](https://github.com/r-uby-dev/llm) agents as a fleet
exposed under a single URL namespace. It provides the routes, request
helpers, scopes and SSE streaming glue so an application can focus on
writing agents instead of the machinery that wires them up.

## Install

```bash
gem install roda-llm
```

## Quick start

The `r.agent!` method can make multiple llm.rb agents available
over HTTP endpoints. The routes it defines are defined inline
within the host application. The fleet is available under
`/agents/<agent-name>/` with `POST` (create), `GET` (stream via SSE)
and `DELETE` (destroy) actions available.

An agent is expected to be an ActiveRecord model that llm.rb supports
out of the box. There can be multiple models, and each model can be a
specialized agent with its own HTTP interface that can be used to
interact with it. The `plugin :agent` method call receives a list
of agents that it will setup endpoints for.

##### agent.rb

```ruby
require "roda"
require "roda-llm"

class Beastie < ActiveRecord::Base
  acts_as_agent do |agent|
    agent.set name: "beastie",
              description: "a chatbot for the 4.4bsd.dev website",
              instructions: proc { File.read("prompt.md") },
              tools: :tools
  end

  private

  def set_provider
    LLM.deepseek
  end

  def tools
    [Beastie::Tools::ReadMan, Beastie::Tools::SearchMan]
  end
end
```

##### config.ru

```ruby
class App < Roda
  plugin :sessions, secret: ENV["SESSION_SECRET"]
  plugin :route_csrf, check_header: true
  plugin :agent, agents: [{class: Beastie, scope: :session}]

  route do |r|
    r.agent!
    r.root { "hello" }
  end
end
run App
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
  plugin :agent, agents: [{class: Beastie, scope: UserScope}]
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
class Beastie::Stream < LLM::Roda::Stream
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
  plugin :agent, agents: [{class: Beastie, stream: Beastie::Stream}]
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
  post(true) { r.create_agent!("beastie") }
  delete(true) { r.destroy_agent!("beastie") }
end
```

</details>

<details>
<summary>Registry</summary>
<br>

[`LLM::Roda.registry`](lib/roda/plugins/agent.rb) maps an agent's
`LLM::Agent#name` (e.g. `"beastie"`) to its class, stream and scope,
wrapped as `LLM::Object`s. It is populated by `plugin :agent`, and
keyed by the agent name. An agent's name can be defined through the
`agent.set name: "..."` method, otherwise it is inferred from the
class name of the agent.

</details>

## License

MIT