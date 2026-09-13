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
    /* The reading column: how far the prose sits from the console's sides.
       The padding belongs to the body rather than the console, so the
       furniture keeps the full width - the composer runs edge to edge, and
       the scrollbar sits at the console's edge instead of inside the text.
       It gives a little with the viewport so a narrow screen does not lose
       a third of its measure to the sides, and expanded - where the
       console takes most of the viewport - the column is wider. */
    --ac-pad-x: clamp(1.25em, 3.5vw, 2.25em);
    --ac-pad-x-expanded: clamp(2.5em, 5.5vw, 5rem);
    /* The live line's ink: the page's text colour when the page names one,
       otherwise the same grey as the rest of the trace. It sits in a bar
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
    overflow: hidden;
    padding: 1em 0;
  }

  /* Expanded, the console leaves the page and takes the viewport over a
     muted backdrop, with the reading column inset - the prose does not run
     the full width of a desktop. */
  :host([expanded]) {
    align-items: center;
    background: var(--ac-surface);
    display: flex;
    flex-direction: column;
    inset: 0;
    margin: 0;
    padding: 2rem 1rem;
    position: fixed;
    z-index: 50;
  }

  :host([expanded]) .ac-console,
  .ac-console.is-expanded {
    border-bottom: 1px solid var(--ac-border);
    border-radius: 0 0 var(--ac-radius) var(--ac-radius);
    flex: 1 1 auto;
    height: auto;
    max-width: 900px;
    width: 100%;
  }

  .ac-body {
    flex: 1 1 auto;
    min-height: 0;
    /* Scrolling is the reader's: the console never moves this itself,
       and anchoring is off so a replaced answer cannot shift the view. */
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    /* The reading column. The console keeps no horizontal padding of its
       own, so the composer below runs edge to edge and the scrollbar sits
       at the console's edge rather than in the middle of the text. */
    padding-left: var(--ac-pad-x);
    padding-right: var(--ac-pad-x);
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
    padding-left: var(--ac-pad-x-expanded);
    padding-right: var(--ac-pad-x-expanded);
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

  /* Markdown, at the sizes r.uby.dev's console ran at: headings tamed
     to 18/16/15/14px rather than arriving at the page's h1/h2 sizes,
     code chips on --ac-surface, pre with the accent on its edge.
     Everything is in em, so it follows --ac-font-size. */
  .ac-answer h1,
  .ac-answer h2,
  .ac-answer h3,
  .ac-answer h4,
  .ac-answer h5 {
    font-weight: 600;
    line-height: 1.3;
    margin: 1em 0 0.57em;
  }

  .ac-answer h1 { font-size: 1.29em; }
  .ac-answer h2 { font-size: 1.14em; }
  .ac-answer h3 { font-size: 1.07em; }
  .ac-answer h4,
  .ac-answer h5 { font-size: 1em; }

  .ac-answer p { margin: 0 0 0.86em; }
  .ac-answer ul,
  .ac-answer ol { margin: 0 0 0.71em; padding-left: 1.43em; }
  .ac-answer li { margin-bottom: 0.43em; }
  .ac-answer li > p { margin-bottom: 0.43em; }
  .ac-answer strong { font-weight: 700; }
  .ac-answer em { color: var(--ac-muted); }

  .ac-answer a {
    color: var(--ac-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

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
    border-left: 2px solid var(--ac-border);
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

  /* A trace of what the agent did, sitting at the top of the console:
     the live line says what is happening now, the summary counts what
     has happened, and the list is a disclosure away. Native <details>,
     so opening it is not our JavaScript. */
  .ac-trace {
    color: var(--ac-muted);
    /* The bar sits between the answer and the composer, so opening the
       list pushes the streamed content up and closing it lets the content
       back down. It takes the full width of the console, meeting the
       borders rather than sitting inside the reading column. */
    flex: 0 0 auto;
    font-family: var(--ac-font-mono);
    line-height: 1.2;
    margin-top: 1.25em;
    max-height: 40%;
    overflow: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  .ac-trace-details { font-size: 0.86em; }

  /* The count stays on screen even at zero, so the line beside the
     live call never moves: "0 actions  Idle" is a resting state. */
  .ac-trace[hidden] { display: none; }
  /* The status bar: one line of information on the left - what is running,
     and how many calls have run - with the chevron alone at the right, so
     it marks the row as a disclosure without competing with either. It runs
     the console's full width and carries its own rules, and the list below
     opens out of it. */
  .ac-trace-summary {
    align-items: center;
    background: var(--ac-surface);
    border-bottom: 1px solid var(--ac-border);
    border-top: 1px solid var(--ac-border);
    cursor: pointer;
    display: flex;
    gap: 0.71em;
    list-style: none;
    /* The column's inset, so the count lines up with the prose above it. */
    padding: 0.5em var(--ac-pad-x);
    user-select: none;
  }

  .ac-trace-summary:hover { color: var(--ac-accent); }

  .ac-trace-summary::-webkit-details-marker { display: none; }

  /* The dot separates the live line from the count, and is only there when
     the live line has something to say. */
  .ac-trace-separator { color: var(--ac-muted); }

  .ac-trace-separator[hidden] { display: none; }

  .ac-icon-chevron {
    flex: none;
    /* Alone at the right edge: it marks the row as a disclosure without
       competing with the live line or the count. */
    margin-left: auto;
    transition: transform 0.15s ease;
  }

  .ac-trace-details[open] .ac-icon-chevron { transform: rotate(180deg); }

  .ac-trace-list {
    display: flex;
    flex-direction: column;
    gap: 0.29em;
    margin-top: 0.43em;
    /* The same inset as the bar, so the rows line up with the count above
       them rather than with the console's edge. */
    padding-left: var(--ac-pad-x);
    padding-right: var(--ac-pad-x);
  }

  /* Opened while there is nothing to show: the list says so, rather than
     leaving a gap where the rows would have been. */
  .ac-trace-empty {
    color: var(--ac-muted);
    display: none;
    padding: 0.43em 0.72em 0;
  }

  .ac-trace-details[open]:has(.ac-trace-list:empty) .ac-trace-empty { display: block; }

  @media (prefers-reduced-motion: reduce) {
    .ac-icon-chevron { transition: none; }
  }

  .ac-action {
    align-items: center;
    display: flex;
    gap: 0.57em;
    min-width: 0;
  }

  /* A call pulses while it runs; once it returns it settles down. */
  .ac-action.is-running { animation: ac-pulse 1.6s ease-in-out infinite; }
  .ac-action.is-done { opacity: 0.72; }

  @keyframes ac-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ac-action.is-running { animation: none; }
  }

  /* Default icons, used when the host slots none of its own - and the
     sizing for the ones it does slot, which arrive as plain images. */
  .ac-icon,
  .ac-action > img,
  .ac-action > svg,
  .ac-status > img,
  .ac-status > svg {
    flex: none;
    height: 1em;
    opacity: 0.75;
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
     mono input, and the icon buttons at the end. It runs the console's
     full width - the card closes on it - and carries the column's inset
     so the prompt lines up with the prose above it. */
  .ac-form {
    align-items: center;
    display: flex;
    font-family: var(--ac-font-mono);
    gap: var(--ac-gap);
    padding: 0.72em var(--ac-pad-x) 0;
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
  </div>

  <div class="ac-trace" part="trace">
    <details class="ac-trace-details" part="trace-details">
      <summary class="ac-trace-summary" part="trace-summary">
        <div class="ac-status" part="status" aria-live="polite"></div>

        <span class="ac-trace-separator" part="trace-separator" aria-hidden="true">&middot;</span>
        <span class="ac-trace-label" part="trace-label"></span>

        <svg class="ac-icon ac-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </summary>

      <div class="ac-trace-list" part="trace-list"></div>

      <div class="ac-trace-empty" part="trace-empty">I haven't run any actions yet</div>
    </details>
  </div>

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
