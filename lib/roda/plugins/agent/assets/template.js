/**
 * The console's shadow DOM: the markup the console drives, and the
 * styles that belong to it. Both are owned by the plugin so a host
 * application only has to render `<agent-console>` and, optionally, slot
 * in a placeholder, tool labels and tool icons.
 */
const markup = `
<style>
  :host {
    display: block;
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    /* Type, taken from r.uby.dev's console: a 14px answer, 13px status,
       12px action rows and an 11px label, expressed in em so the whole
       scale moves with --ac-font-size. The furniture - composer,
       status, action rows - reads in a mono stack, the way a console
       does, while answers stay in the page's own font. */
    --ac-font-size: 0.875em;
    --ac-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    --ac-line-height: 1.6;
    --ac-radius: 8px;
    --ac-chip-radius: 6px;
    --ac-gap: 0.571em;
    --ac-expanded-height: min(80vh, 44rem);
    /* The console's own gutter: the furniture - the composer and the activity list -
       sits this far from the frame. */
    --ac-pad-x: 1.15em;
    /* The reading column: how much further the prose is inset than the
       furniture around it, so the answer has a measure to itself while the
       composer and the status line still run nearly the full width. It
       gives a little with the viewport so a narrow screen does not lose a
       third of its measure to the sides, and expanded - where the console
       takes most of the viewport - the column is wider. */
    --ac-pad-column: clamp(0.5em, 1vw, 1em);
    --ac-pad-column-expanded: clamp(1.25em, 4vw, 4em);
    /* The live line's ink: the page's text colour when the page names one,
       otherwise the same grey as the rest of the activity. It sits in a bar
       that is otherwise furniture, and it is the one thing on screen that
       is moving. */
    --ac-ink: var(--fg, var(--ac-muted));
    /* How far the reading column's content sits from the console's top and
       bottom - the greeting and a streamed answer alike. Zero by default,
       so an answer starts flush; a host whose greeting carries a leading
       margin sets it to match, and the text then holds still when the
       first response arrives. */
    --ac-lead: 0;
    /* Colour, taken from the page when the page names its palette -
       custom properties inherit into a shadow tree, so a site that
       defines --bg/--line/--surface/--muted/--accent gets the console
       in its own colours with no configuration. Plain neutrals
       otherwise: no colour functions, because one parked in a custom
       property cannot fall back, and turns currentColor. */
    --ac-accent: var(--accent, currentColor);
    --ac-background: var(--bg, transparent);
    --ac-border: var(--line, rgba(128, 128, 128, 0.35));
    --ac-surface: var(--surface, rgba(128, 128, 128, 0.08));
    --ac-muted: var(--muted, rgba(128, 128, 128, 1));
    font-size: var(--ac-font-size, 0.875em);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .ac-console {
    --ac-bar-scale: 0.86;
    align-items: stretch;
    background: var(--ac-background);
    border: 1px solid var(--ac-border);
    /* Open at the bottom: the composer closes the card, so the console is
       the top of it. */
    border-bottom: 0;
    border-radius: var(--ac-radius) var(--ac-radius) 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* No gap: the rows own their spacing. The bar belongs to the composer
       and sits flush against it, so a single gap between all of them would
       push the two apart. */
    height: var(--ac-height, auto);
    /* A console measured from its invitation alone is a thin strip when
       the host slots one line of greeting, so the default has a floor:
       the first answer has somewhere to arrive before the console starts
       to scroll. A taller invitation still wins, an explicit height or an
       expanded console overrides it, and a host that wants a different
       floor sets --ac-height-min. */
    min-height: var(--ac-height-min, 24em);
    overflow: hidden;
    padding: 1em var(--ac-pad-x);
  }

  /* Expanded, the console takes the height the host gave it. The overlay
     that presents it - a fixed, centred panel over a muted backdrop - is
     the host's: it has to be, because it styles the host element itself,
     and a rule in here can never win against the page's own rule for
     agent-console. Shadow styles yield to the page on the host, the same
     way they do on a slotted element. */
  :host([expanded]) .ac-console,
  .ac-console.is-expanded {
    /* The host named a height, so the default's floor does not apply. */
    height: var(--ac-expanded-height);
    min-height: 0;
  }

  .ac-body {
    flex: 1 1 auto;
    min-height: 0;
    /* Scrolling is the reader's: the console never moves this itself,
       and anchoring is off so a replaced answer cannot shift the view. */
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    /* The reading column. The console's own gutter stays on the frame, so
       the composer below keeps nearly the full width and the scrollbar sits
       at the console's edge rather than in the middle of the text. */
    padding-left: var(--ac-pad-column);
    padding-right: var(--ac-pad-column);
    /* Reserve the scrollbar's lane whether or not it is showing. The
       answer grows past the console as it streams, so a scrollbar that
       appeared mid-stream would narrow the content box and re-wrap every
       line - a ripple through the answer as it arrives. */
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  /* Expanded, the console takes most of the viewport, so the column gets
     more air. */
  :host([expanded]) .ac-body,
  .ac-console.is-expanded .ac-body {
    padding-left: var(--ac-pad-column-expanded);
    padding-right: var(--ac-pad-column-expanded);
  }

  .ac-answer {
    flex: 0 0 auto;
    line-height: var(--ac-line-height, 1.6);
    /* A long URL or a pasted token in an answer should wrap rather than
       widen the console past the reading column. */
    overflow-wrap: break-word;
  }

  /* One inset for the reading column's first line. The answer's own first
     block has its top margin zeroed below, and whatever a host slots in as
     a placeholder may carry one of its own, so the inset is set on the two
     boxes instead: greeting and answer start on the same line, and the
     text does not jump up when the first response arrives. */
  .ac-answer,
  .ac-placeholder {
    margin-top: var(--ac-lead, 0);
  }

  /* The same inset again underneath. The placeholder is the whole of what
     there is to read before a turn starts, so that end is bracketed; the
     answer runs past the bottom of the console and scrolls, so there it is
     the breathing room at the end of the text. */
  .ac-answer,
  .ac-placeholder {
    margin-bottom: var(--ac-lead, 0);
  }

  /* The answer arrives in two parts: the settled blocks, which are only
     ever appended to, and the trailing block, which is re-rendered as it
     is written. */
  .ac-answer > .ac-render-settled > :first-child { margin-top: 0; }
  .ac-answer > .ac-render-tail > :last-child { margin-bottom: 0; }

  .ac-answer > :first-child { margin-top: 0; }
  .ac-answer > :last-child { margin-bottom: 0; }
  .ac-answer.is-error { color: #b42318; }

  /* Markdown, at the sizes r.uby.dev's console ran at. Headings sit at body
     size in the body's own colour: the blue column and the weight are what
     set them apart, not scale or hue. Code chips on --ac-surface, pre with
     the accent on its edge. Everything is in em, so it follows
     --ac-font-size. */
  .ac-answer h1,
  .ac-answer h2,
  .ac-answer h3,
  .ac-answer h4,
  .ac-answer h5,
  .ac-answer h6 {
    border-left: 3px solid var(--ac-accent);
    font-size: 1em;
    font-weight: 600;
    line-height: 1.3;
    margin: 1em 0 0.57em;
    padding-left: 0.5em;
  }

  .ac-answer p { margin: 0 0 0.86em; }
  .ac-answer ul,
  .ac-answer ol { margin: 0 0 0.71em; padding-left: 1.43em; }
  .ac-answer li { margin-bottom: 0.43em; }
  .ac-answer li > p { margin-bottom: 0.43em; }
  .ac-answer strong { font-weight: 700; }
  .ac-answer em { color: var(--ac-muted); }

  /* A link is the prose: the page's ink, and the page's weight. Nothing
     marks it until the pointer arrives, when it bolds - which is the
     signal the rest of the site uses too. */
  .ac-answer a {
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
  }

  .ac-answer a:hover { font-weight: 700; }

  .ac-answer code {
    background: var(--ac-surface);
    border-radius: 3px;
    font-family: var(--ac-font-mono);
    font-size: 0.9em;
    padding: 0.12em 0.28em;
    white-space: break-spaces;
  }

  .ac-answer pre {
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-left: 3px solid var(--ac-accent);
    border-radius: var(--ac-chip-radius);
    margin: 0.86em 0 1em;
    overflow-x: auto;
    padding: 0.86em 1em;
  }

  .ac-answer pre code {
    background: transparent;
    border: 0;
    border-radius: 0;
    display: block;
    font-size: 0.93em;
    line-height: 1.6;
    overflow-wrap: normal;
    padding: 0;
    tab-size: 2;
    white-space: pre;
    word-break: normal;
  }

  /* A Prism theme, because a shadow tree cannot inherit the page's,
     so highlighted code would otherwise render as plain text. The
     palette is GitHub's, in both of its modes: the plain value is the
     light one and the light-dark() line picks per the page's own
     color-scheme, dropping back to the plain value where a browser
     does not know the function. */
  .ac-answer .token.punctuation { color: inherit; }

  .ac-answer .token.comment,
  .ac-answer .token.prolog,
  .ac-answer .token.doctype,
  .ac-answer .token.cdata {
    color: #6e7781;
    color: light-dark(#6e7781, #8b949e);
  }

  .ac-answer .token.property,
  .ac-answer .token.tag,
  .ac-answer .token.constant,
  .ac-answer .token.symbol,
  .ac-answer .token.deleted,
  .ac-answer .token.interpolation { color: inherit; }

  .ac-answer .token.boolean,
  .ac-answer .token.number {
    color: #0550ae;
    color: light-dark(#0550ae, #79c0ff);
  }

  .ac-answer .token.selector,
  .ac-answer .token.attr-name,
  .ac-answer .token.string,
  .ac-answer .token.char,
  .ac-answer .token.inserted,
  .ac-answer .token.string-literal {
    color: #0a3069;
    color: light-dark(#0a3069, #a5d6ff);
  }

  .ac-answer .token.builtin {
    color: #953800;
    color: light-dark(#953800, #ffa657);
  }

  .ac-answer .token.operator,
  .ac-answer .token.entity,
  .ac-answer .token.url {
    color: #0550ae;
    color: light-dark(#0550ae, #79c0ff);
  }

  .ac-answer .token.atrule,
  .ac-answer .token.attr-value,
  .ac-answer .token.keyword {
    color: #cf222e;
    color: light-dark(#cf222e, #ff7b72);
  }

  .ac-answer .token.function,
  .ac-answer .token.class-name,
  .ac-answer .token.method-definition {
    color: #8250df;
    color: light-dark(#8250df, #d2a8ff);
  }

  .ac-answer .token.regex,
  .ac-answer .token.important,
  .ac-answer .token.variable {
    color: #953800;
    color: light-dark(#953800, #ffa657);
  }

  .ac-answer .token.bold { font-weight: 700; }
  .ac-answer .token.italic { font-style: italic; }

  .ac-answer blockquote {
    border-left: 3px solid var(--ac-accent);
    color: var(--ac-muted);
    margin: 0 0 0.75em;
    padding-left: 0.75em;
  }

  .ac-answer table {
    border-collapse: collapse;
    font-size: 0.95em;
    margin: 0 0 0.75em;
    width: 100%;
  }

  .ac-answer th,
  .ac-answer td {
    border-top: 1px solid var(--ac-border);
    padding: 0.4em 0.5em;
    text-align: left;
  }

  .ac-answer th { font-weight: 600; }
  .ac-answer img { max-width: 100%; }
  .ac-answer hr { border: 0; border-top: 1px solid var(--ac-border); }

  /* The placeholder box takes the page's own ink, so a greeting slotted in
     from the page reads like the page's text rather than like furniture.
     The default greeting, used when the host slots none of its own, is
     styled below: it is a placeholder, and reads muted. */
  .ac-placeholder { color: inherit; }

  .ac-placeholder span { color: var(--ac-muted); }

  /* Before it can say anything, the console is asking where the
     conversation got to. It says so in the invitation's own box, with
     the pulse a running action has. */
  .ac-loading {
    color: var(--ac-muted);
    margin-bottom: var(--ac-lead, 0);
    margin-top: var(--ac-lead, 0);
  }

  .ac-loading span { animation: ac-pulse 1.6s ease-in-out infinite; }

  /* The live line: which tool is running, "Thinking…" while the turn waits
     on the model, and nothing at all in between. It is always on screen -
     the bar it sits in never blinks out - but it only speaks when it has
     something to say. */
  .ac-status {
    align-items: center;
    /* The live line carries the ink; the count beside it stays muted. */
    color: var(--ac-ink);
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.93em;
    gap: 0.57em;
    line-height: 1.2;
  }

  .ac-status .is-thinking { font-style: italic; }

  /* The activity of the running turn, sitting at the top of the console:
     the live line says what is happening now, the summary counts what
     has happened, and the list is a disclosure away. Native <details>,
     so opening it is not our JavaScript. */
  .ac-activity {
    color: var(--ac-muted);
    /* The bar sits between the answer and the composer, so opening the
       list pushes the streamed content up and closing it lets the content
       back down. It runs the console's full width - bleeding out through
       the frame's own gutter, the way it did before - so its rules meet the
       borders; its text keeps the bar's own small inset. */
    flex: 0 0 auto;
    font-family: var(--ac-font-mono);
    line-height: 1.2;
    margin-left: calc(-1 * var(--ac-pad-x));
    margin-right: calc(-1 * var(--ac-pad-x));
    margin-top: 1.25em;
    max-height: 40%;
    overflow: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  /* The bar steps down from the console's own text, and a card that belongs
     to the bar steps down from that: two steps, named here once so nothing
     that wants to be a card has to guess the arithmetic. */
  .ac-activity { font-size: calc(var(--ac-bar-scale) * 1em); }


  /* Panels: the bar's extras. A label opens a card above it. */
  .ac-panels {
    align-items: center;
    display: flex;
    flex: none;
    gap: 0.55em;
  }

  /* A hairline between labels. */
  /* The pipe between two labels: the label's own size, so it stands as
     tall as the words it separates, and quiet enough not to be read as
     punctuation. */
  .ac-panel-divider {
    align-self: center;
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    line-height: 1;
    opacity: 0.4;
    user-select: none;
  }

  /* The label carries the type, not the button: em
     sizes on both would compound. */
  .ac-panel {
    align-items: center;
    background: none;
    border: 0;
    border-radius: 0.25em;
    color: var(--ac-muted);
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: 0.3em;
    padding: 0.1em 0;
  }

  /* Small, mono, tracked out, upper case: terminal
     furniture, not prose. */
  .ac-panel-label {
    align-items: center;
    color: inherit;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    font-weight: 500;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }

  .ac-panel:hover,
  .ac-panel.is-open { color: var(--ac-accent); }

  .ac-panel:hover .ac-panel-label,
  .ac-panel.is-open .ac-panel-label {
    text-decoration: underline;
    text-underline-offset: 0.28em;
  }

  .ac-panel:focus-visible {
    outline: 2px solid var(--ac-accent);
    outline-offset: 2px;
  }

  .ac-panel-badge {
    border: 1px solid currentColor;
    border-radius: 0.25em;
    font-size: 0.72em;
    padding: 0 0.35em;
  }

  /* The card: one surface, one ink, one radius, a soft
     shadow. Every panel's card is this. */
  /* The card: a panel of the console, not a speech bubble. Its
     size is the host's to say, and it scrolls its own contents
     rather than the bar's. */
  .ac-card {
    background: var(--ac-help-background, #fff);
    background: var(--ac-help-background, light-dark(#fff, #161b22));
    border: 1px solid var(--ac-card-border, var(--ac-border));
    border-radius: 0.4em;
    box-shadow: var(--ac-card-shadow, 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.18));
    color: var(--ac-help-ink, #1f2328);
    color: var(--ac-help-ink, light-dark(#1f2328, #e6edf3));
    display: none;
    flex-direction: column;
    font-family: inherit;
    font-size: var(--ac-card-size, 13px);
    line-height: 1.45;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: fixed;
    z-index: 3;
  }

  /* The heading: the card's blue, the ink on it, a rule
     under it, and tight. */
  /* The heading bar: white on the card's blue, square-edged, with
     a highlight along its top edge, like a title bar. */
  .ac-card-head {
    align-items: center;
    background: var(--ac-card-head, #0969da);
    background: var(--ac-card-head, light-dark(#0969da, #1f6feb));
    border-bottom: 1px solid var(--ac-card-head-rule, #0550ae);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
    color: var(--ac-card-head-ink, #fff);
    display: flex;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.72em;
    font-weight: 700;
    gap: 0.6em;
    justify-content: space-between;
    letter-spacing: 0.12em;
    margin: 0;
    min-height: 2.1em;
    padding: 0 0.7em;
    text-transform: uppercase;
  }

  .ac-panel-view { max-height: min(50vh, 26em); }

  /* A closed popover is hidden by the user agent, but
     only when nothing author-level says otherwise. */
  .ac-card:popover-open,
  .ac-card.is-open { display: flex; }

  /* Thin scrollbar, so a long trace reads as a pane and not
     as a page. */
  .ac-panel-body {
    overflow: auto;
    scrollbar-color: var(--ac-hairline, rgba(128, 128, 128, 0.4)) transparent;
    scrollbar-width: thin;
  }

  .ac-panel-note {
    color: inherit;
    font-size: 0.9em;
    opacity: 0.6;
    padding: 0.9em 0.7em;
  }

  .ac-panel-note[hidden] { display: none; }

  /* A turn: a disclosure, one open at a time. */
  .ac-panel-group { border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25)); }

  .ac-panel-group:first-child { border-top: 0; }

  /* A turn: a log group's heading, at the size of a heading. */
  .ac-panel-group-summary {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.76em;
    font-weight: 500;
    gap: 0.5em;
    letter-spacing: 0.1em;
    list-style: none;
    opacity: 0.65;
    padding: 0.55em 0.7em;
    text-transform: uppercase;
    user-select: none;
  }

  .ac-panel-group-summary::-webkit-details-marker { display: none; }
  .ac-panel-group-summary:hover { color: var(--ac-accent); opacity: 1; }
  .ac-panel-group-summary:focus-visible { outline: 2px solid var(--ac-accent); outline-offset: -2px; }
  .ac-panel-group-summary .ac-icon { height: 0.8em; width: 0.8em; }

  .ac-panel-group[open] .ac-panel-group-summary .ac-icon { transform: rotate(180deg); }

  /* The count, in a chip: quiet, and the same shape as a
     label's badge. */
  /* Square chips, not pills: this is a console. */
  .ac-panel-group-count {
    border: 1px solid currentColor;
    border-radius: 0.25em;
    font-size: 0.85em;
    font-variant-numeric: tabular-nums;
    margin-left: auto;
    opacity: 0.7;
    padding: 0 0.35em;
  }

  .ac-panel-group .ac-panel-row:first-of-type { border-top: 0; }

  /* One row per thing that happened: a hairline between
     rows, nothing around them, and a tint under the
     pointer. */
  /* One event per line: a marker, its words, and how long it
     took, in columns. */
  /* One event per line: a mark, the kind of event, what it was
     called and what it carried, and how long it took. A row
     with no kind gives the mark its room back. */
  /* An event: the mark, the label and the body, and the time.
     Compact, and tall enough for what the event carried. */
  /* An event: the mark, and beside it the kind of thing that
     happened, what it was, and how long it took. */
  .ac-panel-row {
    align-items: start;
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    display: grid;
    gap: 0 0.6em;
    grid-template-columns: 1.2em minmax(0, 1fr) auto;
    padding: 0.4em 0.7em 0.5em;
    transition: background 0.12s ease;
  }

  .ac-panel-row.has-kind {
    grid-template-columns: 1.7em 5.6em minmax(0, 1fr) auto;
  }

  .ac-panel-row:first-child { border-top: 0; }

  .ac-panel-row:hover { background: var(--ac-card-row, rgba(128, 128, 128, 0.08)); }

  /* The marker, in a column of its own so every row's words start
     at the same place. */
  /* The mark, big enough to notice, in a column of its own so
     every row's words start at the same place. */
  /* The mark, against the label rather than the body. */
  .ac-panel-row .ac-icon {
    color: inherit;
    height: 1.2em;
    margin-top: 0.1em;
    opacity: 0.9;
    width: 1.2em;
  }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* What each kind of event is, at a glance. */
  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  /* The title, and the detail after it, on one line. */
  .ac-panel-row-kind {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.68em;
    letter-spacing: 0.09em;
    opacity: 0.75;
    text-transform: uppercase;
  }

  /* The title, and the detail after it, on one line. */
  /* The label line: the kind of event, then what it was
     called. */
  /* The summary: what happened, and a plus when there is more folded
     behind it. */
  .ac-panel-row-label {
    align-items: baseline;
    cursor: pointer;
    display: flex;
    gap: 0.6em;
    list-style: none;
    min-width: 0;
    user-select: none;
  }

  /* Arguments and content are code-shaped, so they keep the mono
     face. */
  /* What the event carried, wrapped: an argument or a message
     is longer than a line. */
  /* What the event was, a line at a time: a name, each argument,
     a result. */
  .ac-panel-row-pairs {
    font-family: var(--ac-font-mono);
    font-size: 0.83em;
    margin-top: 0.1em;
  }

  .ac-panel-row-key { color: inherit; opacity: 0.6; }
  .ac-panel-row-key:after { content: ":"; }
  .ac-panel-row-value { color: inherit; overflow-wrap: anywhere; }

  /* What someone said, wrapped. */
  /* What the tool gave back: the shape of a parameter, told apart
     from them by a rule. */
  .ac-panel-row-result {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    margin-top: 0.25em;
    padding-top: 0.25em;
  }

  /* How long it took, in its own column: the number a reader
     is usually looking for. */
  /* How long it took, against the label. */
  .ac-panel-row-duration {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.8em;
    font-variant-numeric: tabular-nums;
    opacity: 0.7;
    padding-top: 0.1em;
    text-align: right;
  }

  .ac-panel-row.is-error .ac-panel-row-title { color: #cf222e; }
  .ac-panel-row.is-error .ac-icon { color: #cf222e; opacity: 1; }
  .ac-panel-row.is-muted { opacity: 0.65; }

  @media (prefers-reduced-motion: reduce) {
    .ac-loading span { animation: none; }
  }


  /* An event: one thing that happened, and the control that opens it.
     Two columns at most: what it was, and the control at the edge. */
  /* The row is the control: no padding of its own, so the summary
     inside it is the whole row and every part of it is clickable. */
  .ac-panel-row {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    padding: 0;
    transition: background 0.12s ease;
  }

  /* The summary: a mark, two lines, and the control. */
  .ac-panel-row-label {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: 0.55em;
    list-style: none;
    padding: 0.4em 0.7em 0.5em;
    user-select: none;
  }

  .ac-panel-row-label::-webkit-details-marker { display: none; }
  .ac-panel-row-label:focus-visible { outline: 2px solid var(--ac-accent); outline-offset: 2px; }
  .ac-panel-row-what { flex: 1 1 auto; min-width: 0; }

  .ac-panel-row-head {
    align-items: baseline;
    display: flex;
    gap: 0.55em;
    min-width: 0;
  }

  /* The mark, against the first line rather than the second. */
  .ac-panel-row .ac-icon {
    flex: none;
    height: 1.15em;
    margin-top: 0.1em;
    opacity: 0.9;
    width: 1.15em;
  }

  .ac-panel-row[data-icon="person"] .ac-icon { color: var(--ac-muted); }
  .ac-panel-row[data-icon="speech"] .ac-icon { color: var(--ac-accent); }
  .ac-panel-row[data-icon="tool"] .ac-icon { color: #bf8700; color: light-dark(#bf8700, #d29922); }
  .ac-panel-row[data-icon="return"] .ac-icon { color: #1a7f37; color: light-dark(#1a7f37, #3fb950); }
  .ac-panel-row[data-icon="clock"] .ac-icon { color: #0969da; color: light-dark(#0969da, #4493f8); }
  .ac-panel-row[data-icon="warn"] .ac-icon { color: #cf222e; opacity: 1; }

  .ac-panel-row-kind {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.68em;
    letter-spacing: 0.09em;
    opacity: 0.75;
    text-transform: uppercase;
  }

  .ac-panel-row-kind[data-running] {
    color: #bf8700;
    color: light-dark(#bf8700, #d29922);
    opacity: 1;
  }

  /* How long it took: the right edge, in its own column, so the seconds
     line up down the trace. */
  .ac-panel-row-duration {
    color: inherit;
    flex: none;
    font-family: var(--ac-font-mono);
    font-size: 0.82em;
    font-variant-numeric: tabular-nums;
    margin-left: auto;
    min-width: 3.4em;
    text-align: right;
    white-space: nowrap;
  }

  .ac-panel-row-title {
    color: inherit;
    font-size: 0.94em;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* The second line: what the row was called, or what was said. */
  .ac-panel-row-subject {
    align-items: baseline;
    color: inherit;
    display: flex;
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    gap: 0.4em;
    min-width: 0;
  }

  .ac-panel-row-detail {
    color: inherit;
    display: block;
    font-family: var(--ac-font-mono);
    font-size: 0.83em;
    overflow-wrap: anywhere;
  }

  /* The key keeps its width, so a word cannot wrap letter by letter;
     the value gives way instead. */
  .ac-panel-row-key {
    color: inherit;
    flex: none;
    opacity: 0.6;
    white-space: nowrap;
  }

  .ac-panel-row-key:after { content: ":"; }

  .ac-panel-row-value {
    color: inherit;
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* What the control opens. */
  .ac-panel-row-body {
    font-family: var(--ac-font-mono);
    font-size: 0.78em;
    padding: 0 0.7em 0.6em 1.7em;
  }

  .ac-panel-row-pair {
    display: grid;
    gap: 0.4em;
    grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
  }

  .ac-panel-row-result {
    border-top: 1px solid var(--ac-hairline, rgba(128, 128, 128, 0.25));
    margin-top: 0.25em;
    padding-top: 0.25em;
  }

  .ac-panel-row-result .ac-panel-row-key { color: #1a7f37; opacity: 1; }
  .ac-panel-row-result.is-error .ac-panel-row-key,
  .ac-panel-row-result.is-error .ac-panel-row-value { color: #cf222e; }


  /* A call pulses while it runs; once it returns it settles down. */

  /* Default icons, used when the host slots none of its own - and the
     sizing for the ones it does slot, which arrive as plain images. */
  .ac-icon,
  .ac-status > img,
  .ac-status > svg {
    flex: none;
    height: 1em;
    width: 1em;
  }


  /* Icons the host slots for the buttons, sized to match the ones above. */
  .ac-expand ::slotted(svg),
  .ac-reset ::slotted(svg) {
    display: block;
    height: 1em;
    width: 1em;
  }

  /* The composer: their form strip. A muted shell prompt, a borderless
     mono input, and the icon buttons at the end. It sits inside the
     console's own gutter, so the input keeps the width it had. */

  .ac-form {
    align-items: center;
    display: flex;
    font-family: var(--ac-font-mono);
    gap: var(--ac-gap);
    padding-top: 0.72em;
  }

  .ac-form:focus-within .ac-prompt { color: var(--ac-accent); }

  .ac-prompt {
    color: var(--ac-muted);
    font-family: var(--ac-font-mono);
    user-select: none;
  }

  .ac-input {
    background: transparent;
    border: 0;
    color: inherit;
    flex: 1 1 auto;
    font: inherit;
    min-width: 0;
    padding: 0;
  }

  .ac-input:focus-visible { outline: none; }

  .ac-input::placeholder { color: var(--ac-muted); }

  .ac-input:read-only { opacity: 0.6; }

  .ac-buttons {
    display: flex;
    gap: 0.29em;
  }

  .ac-expand,
  .ac-reset {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--ac-muted);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    justify-content: center;
    padding: 0.15em;
  }

  .ac-expand:hover,
  .ac-reset:hover { color: var(--ac-accent); }

  /* The expand button shows the arrows that make sense for its state. */
  .ac-icon-collapse { display: none; }
  .ac-console.is-expanded .ac-icon-expand,
  :host([expanded]) .ac-icon-expand { display: none; }
  .ac-console.is-expanded .ac-icon-collapse,
  :host([expanded]) .ac-icon-collapse { display: block; }
</style>

<div class="ac-console" part="console">
  <template class="ac-icon-call"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></template>

  <template class="ac-icon-return"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></template>

  <div class="ac-body" part="body">
    <div class="ac-answer" part="answer"></div>

    <div class="ac-placeholder" part="placeholder">
      <slot name="placeholder"><span>Ask me anything.</span></slot>
    </div>

    <!-- Shown while the console asks where the conversation got to, so
         it never opens on an invitation that may not apply. -->
    <div class="ac-loading" part="loading"><span>Loading console…</span></div>

    <!-- The last message of a conversation that has been somewhere. It
         carries the answer's class as well as its own name, so it is
         rendered, measured and highlighted as an answer is. -->
    <div class="ac-answer ac-last-message" part="last-message" hidden></div>
  </div>

    <div class="ac-activity" part="activity">
      <div class="ac-status" part="status" aria-live="polite"></div>

      <!-- The host's labels. Each opens a card. -->
      <div class="ac-panels" part="panels"></div>
    </div>

<!-- One card, reused by every panel. A popover, placed above the label
     it belongs to by the console. -->
<div class="ac-card ac-panel-view" part="card panel-view" popover="manual">
  <div class="ac-card-head ac-panel-head" part="card-head panel-head">
    <span class="ac-panel-title" part="panel-title"></span>
  </div>
  <div class="ac-panel-body" part="panel-body"></div>
  <div class="ac-panel-note" part="panel-note"></div>
</div>

<!-- Panels arrive as <agent-panel> children. The
     slot finds them and keeps them off the page. -->
    <slot name="panels" hidden></slot>

  <form class="ac-form" part="form">
    <span class="ac-prompt" part="prompt" aria-hidden="true">$</span>
    <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask…" aria-label="Message">

    <div class="ac-buttons">
      <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat"><svg class="ac-icon ac-icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><svg class="ac-icon ac-icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg></button>
      <button class="ac-reset" part="reset" type="button" title="Reset console"><slot name="reset-icon"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></slot></button>
      </div>
    </form>
</div>
`

const template = document.createElement("template")
template.innerHTML = markup

export function clone() {
  return template.content.cloneNode(true)
}
