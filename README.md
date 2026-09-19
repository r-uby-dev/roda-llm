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

> **PRE-RELEASE SOFTWARE** <br>
> roda-llm has not yet made a public 0.1.0 release. It is available to
> use via GitHub and it is actively used on
> [r.uby.dev](https://r.uby.dev) website. Expect some rough edges before
> a public release.

Welcome to the canonical roda-llm repository.

roda-llm is a [Roda](https://roda.jeremyevans.net) plugin that
provides a framework for deploying multiple [llm.rb](https://github.com/r-uby-dev/llm#readme)
agents within your Roda, Rack or Rails application. It provides
a suite of tools that can add agentic features to your Ruby web
applications with a minimal amount of code.

The plugin includes a custom HTML5 element
(`<agent-console>...</agent-console>`) that can be used to
attach a web console to your agents. The `<agent-console>`
element is provided by a small JavaScript file that is
written in vanilla JavaScript and distributed
with the rubygem.

## Install

```bash
gem install roda-llm
```

## Quick start

##### agent.rb

An agent is an ActiveRecord model that you own. The plugin
provides HTTP endpoints and a web console that you can attach
to your agents. An agent can implement its own tools, use
MCP tools, and pretty much anything else an llm.rb agent can
do. An agent is stored in a single column on a single row as
a JSON blob that can be optimized to use `jsonb` on postgres.


```ruby
require "roda"
require "roda-llm"

class Roff < ActiveRecord::Base
  acts_as_agent(format: :jsonb) do |agent|
    agent.set name: "roff",
              description: "an agent that specializes in reading man pages",
              instructions: proc { File.read("prompt.md") },
              tools: :man_tools
  end

  private

  def set_provider
    LLM.deepseek
  end

  def man_tools
    [Roff::Tools::ReadMan, Roff::Tools::SearchMan]
  end
end
```

##### config.ru

roda-llm does not provide a Roda application by itself,
so you would always create own your subclass of Roda that
could be mounted within a host Rack or Rails application. It
also gives you the opportunity to extend the plugin's functionality
by extending the Roda subclass.

A resolver is how a user of the plugin can choose how agent is
created, found, and destroyed. It has access to the Roda application,
the request object, and request parameters to help it decide how
to create, find and destroy an agent. It may also define
`finalize(agent, res)`, which the plugin calls once a turn is done, so a
resolver can write down what the conversation came to.

```ruby
class App < Roda
  plugin :sessions, secret: ENV["SESSION_SECRET"]
  plugin :agent, agents: [{class: Roff, resolver: LLM::Roda::Resolver::Session}]

  route do |r|
    r.agent!
    r.root { "hello" }
  end
end
run App
```

##### index.erb

The `<agent-console>` HTML element can render a console that
you can use to talk to agent. The console can be rendered server-side,
so you can prepopulate the content of the console with a placeholder
or initial state before handing it over to the client side to
render.

The console can also be configured through various different
attributes, and slots. This approach is agnostic to where it
is deployed: it works the same in Rails, Rack, and Roda. The
console's own markup and styles are owned by the plugin and
rendered into a shadow root, so an application only renders the
element, and slots in whatever it wants to override:

```html
<script src="/roda-llm/htmlelement.js"></script>

<agent-console agent="roff">
  <div slot="placeholder">
    <p>Ask me anything about the 4.4BSD manual.</p>
  </div>
</agent-console>
```

##### styles

The console takes its colour and font from wherever it sits: text colour
and font family are inherited, the sizes are relative, and the border,
surface and muted tones are neutrals that follow the page's own
`color-scheme`.

Its furniture - the composer, the count and the live line - reads in a
mono stack the way a console does, while answers stay in the page's font,
and everything is sized in em from `--ac-font-size`, so one value moves
the whole thing.

Beyond that, the tokens below are the whole surface: set them to point
the console at a palette, or style it from the outside with `::part()`.
Every part is available: `console`, `body`, `answer`, `placeholder`,
`last-message`, `loading`, `activity`, `activity-details`,
`activity-summary`, `activity-separator`, `activity-label`,
`activity-list`, `activity-empty`, `status`, `panels`, `panel`,
`panel-divider`, `panel-group`, `panel-group-summary`, `panel-row`,
`card`, `card-head`, `panel-title`, `panel-body`, `panel-note`, `form`,
`prompt`, `input`, `expand` and `reset`:

```html
<style>
  agent-console {
    /* type */
    --ac-font-size: 0.9375em;  /* everything else is relative */
    --ac-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    --ac-line-height: 1.6;     /* answers */

    /* structure */
    --ac-radius: 0.25rem;      /* the console's corners */
    --ac-chip-radius: 0.375rem;/* code blocks */
    --ac-gap: 0.625rem;        /* between the composer's controls */
    --ac-height: 24rem;        /* unset measures the placeholder, floored below */
    --ac-height-min: 24em;     /* the floor under that measurement */
    --ac-expanded-height: 40rem;
    --ac-lead: 0;              /* above and below the reading column's text */

    /* colour: point these at the host's palette */
    --ac-accent: currentColor; /* hovers, focus ring, links */
    --ac-help-background: #fff;    /* a card's surface */
    --ac-help-ink: #1f2328;        /* and its ink */
    --ac-card-head: #0969da;       /* a card's heading: white on blue */
    --ac-card-head-ink: #fff;
    --ac-card-head-rule: #0550ae;  /* the rule under it */
    --ac-background: transparent;
    --ac-border: rgba(128, 128, 128, 0.35);
    --ac-surface: rgba(128, 128, 128, 0.08);
    --ac-muted: rgba(128, 128, 128, 1);
  }

  /* The bar opens the list, so it answers to the pointer. */
  agent-console::part(panel):hover { color: var(--accent, currentColor); }

  /* The live line carries the ink; the count stays muted. */
  agent-console::part(status) { color: var(--fg, currentColor); }
</style>
```

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

    rake roda:llm:assets:install     # install the console element into the host application
    rake roda:llm:db:create          # create the database
    rake roda:llm:db:dump            # regenerate db/schema.rb from the database
    rake roda:llm:db:load            # build the schema from db/schema.rb, then load db/seeds.rb
    rake roda:llm:db:load_seed       # load db/seeds.rb
    rake roda:llm:db:migrate         # run pending migrations (creating the database first if needed)
    rake roda:llm:db:rollback        # rollback the most recent migration
    rake roda:llm:db:status          # show migration status
    rake roda:llm:g:migration[name]  # generate a migration (eg: rake roda:llm:g:migration[create_users])


<details>
<summary>Routes</summary>
<br>

The default routes. The `/agents` namespace is always
included but it is expected that a Roda application is
being mounted within another Roda application or from
`config/routes.rb` when Rails is the target. So this
namespace can be relative to another path that you
choose, such as `/users/:id/agents`.

All routes are protected by the `route_csrf` plugin. A
page should include a token in `meta[name='_csrf']`
or provide one explicitly via the `csrf` attribute
on the `agent-console` element.

| Method | Path | Behaviour |
|---|---|---|
| `GET`    | `/agents/<name>`       | Returns a JSON representation of the agent |
| `POST`   | `/agents/<name>`       | (stream) upserts (find or create) an agent |
| `DELETE` | `/agents/<name>`       | destroys the agent |

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
interface: subclasses implement `find`, `create` and `destroy`, and may
implement `finalize`, which is called once a turn is done. A
resolver is built with the Roda application and the request being served, and
both are exposed as readers (`roda` and `request`), along with the request's
`params`.

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

  ##
  # Called when a turn is done, with
  # the agent that made it and the
  # response it produced.
  #
  # @param [LLM::Agent] agent
  # @param [LLM::Response] res
  # @return [void]
  def finalize(agent, res)
    ##
    # Do something with the agent
    # or the response it produced.
    # For example: track token usage.
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
  plugin :agent, agents: [{class: Roff, resolver: UserResolver}]
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
class Roff::Stream < LLM::Roda::Stream
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
  plugin :agent, agents: [{class: Roff, stream: Roff::Stream}]
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
  post(true) { r.create_agent!("Roff") }
  delete(true) { r.destroy_agent!("Roff") }
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
