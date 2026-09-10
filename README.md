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

Welcome to the canonical roda-llm repository.

roda-llm is a [Roda](https://roda.jeremyevans.net) plugin that
provides a framework for deploying multiple [llm.rb](https://github.com/r-uby-dev/llm#readme)
agents within your Roda, Rack or Rails application. The HTTP endpoints are
provided via a Roda app that can be mounted within your own
Rack/Rails app. It makes it trivial to deploy multiple agents
at scale while letting you focus on the code that makes your
agent useful rather than the glue that makes it functional.

An agent is an ActiveRecord model that you own. It is powered by
the llm.rb runtime and its `acts_as_agent` ActiveRecord extension.
For Rack and Roda applications rake tasks are provided that can
support you in setting up ActiveRecord within a non-Rails setting.
In a Rails setting, it is managed by the Rails framework. It is also
possible support Sequel models and direct subclasses of [`LLM::Agent`](https://github.com/r-uby-dev/llm#readme)
but the most common path is assumed to be ActiveRecord.

The plugin  includes a HTML5 web component that can be used
to provide a web interface to an llm.rb agent. The web component
is highly configurable - for example, you can define how tool calls
render in the status bar. It is also written in vanilla JavaScript
and uses technology that is builtin to the browser. The javascript
asset can be installed into your application via a builtin rake
task.

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
require "roda/llm/rake/migrations"
```

The available tasks:

    rake roda:llm:assets:install     # install the web component into the host application
    rake roda:llm:db:create          # create the database
    rake roda:llm:db:migrate         # run pending migrations (creating the database first if needed)
    rake roda:llm:db:rollback        # rollback the most recent migration
    rake roda:llm:db:status          # show migration status
    rake roda:llm:g:migration[name]  # generate a migration (eg: rake roda:llm:g:migration[create_users])

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

roda-llm does not provide a Roda application by itself,
so you would always create own your subclass of Roda that
could be a component that integrates with the rest of your
application. It also gives you the opportunity to extend
the plugin's functionality by extending the Roda application.

A resolver has its own section later in the README.md but it is
worth knowing that it is how you can implement callbacks
that determine how an agent is found, saved, and created. The
builtin session resolver uses a session-backed store to link the
agent's database record to a browser-based user session.

The `route_csrf` plugin is optional but recommended to prevent
cross forgery attacks. It is largely optional because outside
Roda it might be handled differently. It is generally a good
default to opt into.

```ruby
class App < Roda
  plugin :sessions, secret: ENV["SESSION_SECRET"]
  plugin :route_csrf, check_header: true
  plugin :agent, agents: [{class: Theo, resolver: LLM::Roda::Resolver::Session}]

  route do |r|
    r.agent!
    r.root { "hello" }
  end
end
run App
```

##### index.erb

The `<agent>` web component can render a console that you can use
to talk to agent. The console can be rendered server-side, so
you can prepopulate the content of the console with a placeholder
or initial state before handing it over to the client side to
render.

The console can also be configured through various different
attributes, and slots. This approach is agnostic to where it
is deployed: it works the same in Rails, Rack, and Roda:

```html
<script src="/roda-llm/web-component.js"></script>

<agent name="theo">
  <div slot="placeholder">
    <p>Hi! Ask me anything about the 4.4BSD manual.</p>
  </div>

  <img slot="tool.read-man.call-icon" src="icons/man-call-icon.svg">
  <span slot="tool.read-man.call">Reading man page {arguments.name}</span>

  <img slot="tool.read-man.return-icon" src="icons/man-return-icon.svg">
  <span slot="tool.read-man.return">Read {count} man pages</span>

  <span slot="tool.*.call">Running {name}…</span>
  <span slot="tool.*.return">Done</span>
</agent>
```

<details>
<summary>Routes</summary>
<br>

The default routes. The `/agents` namespace is always
included but it is expected that a Roda application is
being mounted within another Roda application or from
`config/routes.rb` when Rails is the target. So this
namespace can be relative to another path that you
choose, such as `/users/:id/agents`.

| Method | Path | Behaviour |
|---|---|---|
| `POST`   | `/agents/<name>`       | create an agent of that class |
| `GET`    | `/agents/<name>?q=...`  | talk to the agent (SSE stream) |
| `DELETE` | `/agents/<name>`       | destroy the bound agent |

</details>

<details>
<summary>Resolvers</summary>
<br>

A resolver lets you implement different backends for the
discovery, creation and destruction of agents. The default
resolver implements a backend that is tied to a user's session
and it can work for guest users as well. This feature gives
users of the plugin control over how an agent is found, created
and destroyed.

[`LLM::Roda::Resolver`](lib/roda/plugins/agent/resolver.rb) is the abstract
interface: subclasses implement `find`, `create` and `destroy`. A
resolver is built with the Roda application and the request being served, and
both are exposed as readers (`roda` and `request`), along with the request's
`params`. The session belongs to the app, so it is reached through `roda`. An
example of a custom resolver binding an agent to the authenticated user
instead of the user's session:

```ruby
##
# Custom resolver: one agent per signed-in user.
class UserResolver < LLM::Roda::Resolver
  ##
  # @return [LLM::Agent, nil]
  def find(klass)
    klass.find_by(user: current_user)
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
    roda.session[:user_id] && User.find(roda.session[:user_id])
  end
end

class App < Roda
  plugin :agent, agents: [{class: Theo, resolver: UserResolver}]
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
registered agent class and its resolver via the `registry`, builds a resolver
for the current Roda request, and performs the action.
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

The [`registry`](lib/roda/plugins/agent.rb) method is
added to each Roda application that includes the
Roda plugin. The registry maintains a list of agents
that the Roda application is aware of and can serve
requests for. Each agent is known by a class, and also
by a resolver. The resolver receives the class, and
determines how an agent is found, saved, and destroyed.

</details>

## See also

The [r.uby.dev](https://r.uby.dev) website is powered by roda-llm.
Most of the code from roda-llm originated there, and in
an effort to avoid duplication and reproduce the same
features in other applications roda-llm was born. The
r.uby.dev website provides a chatbot that is connected to
this very repository (and the llm.rb repository) so you
can get authorative answers about both codebases.

## License

MIT
