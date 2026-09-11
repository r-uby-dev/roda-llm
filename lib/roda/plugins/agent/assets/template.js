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
    --ac-radius: 0.5rem;
    --ac-chip-radius: 0.375rem;
    --ac-gap: 0.625rem;
    --ac-expanded-height: 28rem;
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
    border-radius: var(--ac-radius);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: var(--ac-gap);
    height: var(--ac-height, auto);
    overflow: hidden;
    padding: 1em 1.15em;
  }

  :host([expanded]) .ac-console,
  .ac-console.is-expanded {
    height: var(--ac-expanded-height);
  }

  .ac-main {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--ac-gap);
    min-height: 0;
    min-width: 0;
  }

  .ac-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }

  .ac-answer { flex: 0 0 auto; line-height: var(--ac-line-height, 1.6); }

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

  .ac-placeholder { color: var(--ac-muted); }

  .ac-status {
    align-items: center;
    color: var(--ac-muted);
    display: none;
    font-family: var(--ac-font-mono);
    font-size: 0.93em;
    font-style: italic;
    gap: 0.57em;
    line-height: 1.2;
  }

  /* Their status panel: a filled chip, so "Thinking…" reads as state
     rather than as a stray line of text. */
  .ac-status.is-active {
    background: var(--ac-surface);
    border-radius: var(--ac-chip-radius);
    display: flex;
    padding: 0.57em 0.72em;
  }

  /* The actions the agent took: a sidebar beside the answer, drawn as
     their status panel was - a filled chip - so the log never takes
     room from the answer or resizes the console. */
  .ac-actions {
    background: var(--ac-surface);
    border-radius: var(--ac-chip-radius);
    box-sizing: border-box;
    color: var(--ac-muted);
    flex: 0 0 var(--ac-sidebar-width, 13rem);
    font-size: 0.86em;
    gap: 0.29em;
    line-height: 1.2;
    max-width: 50%;
    overflow: auto;
    overflow-wrap: anywhere;
    padding: 0.57em 0.72em;
    scrollbar-width: thin;
  }

  .ac-actions:not([hidden]) {
    display: flex;
    flex-direction: column;
  }

  .ac-actions-label {
    font-size: 0.92em;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .ac-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ac-action {
    align-items: center;
    display: flex;
    font-family: var(--ac-font-mono);
    gap: 0.375rem;
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

  /* Default icons, used when the host slots none of its own. */
  .ac-icon {
    flex: none;
    height: 1em;
    opacity: 0.75;
    width: 1em;
  }

  /* The composer: their form strip. A hairline above it, a muted shell
     prompt, a borderless mono input, and the icon buttons at the end. */
  .ac-form {
    align-items: center;
    border-top: 1px solid var(--ac-border);
    display: flex;
    font-family: var(--ac-font-mono);
    gap: 0.57em;
    padding-top: 0.72em;
  }

  .ac-form:focus-within { border-top-color: var(--ac-accent); }

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
  .ac-console.is-expanded .ac-icon-expand { display: none; }
  .ac-console.is-expanded .ac-icon-collapse { display: block; }
</style>

<div class="ac-console" part="console">
  <template class="ac-icon-call"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></template>

  <template class="ac-icon-return"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></template>

  <div class="ac-main" part="main">
    <div class="ac-body" part="body">
      <div class="ac-answer" part="answer"></div>

      <div class="ac-placeholder" part="placeholder">
        <slot name="placeholder"><span>Ask me anything.</span></slot>
      </div>
    </div>

    <div class="ac-status" part="status" aria-live="polite"></div>

    <form class="ac-form" part="form">
      <span class="ac-prompt" part="prompt" aria-hidden="true">$</span>
      <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask…" aria-label="Message">

      <div class="ac-buttons">
        <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat"><svg class="ac-icon ac-icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><svg class="ac-icon ac-icon-collapse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg></button>
        <button class="ac-reset" part="reset" type="button" title="Reset console"><svg class="ac-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></button>
      </div>
    </form>
  </div>

  <aside class="ac-actions" part="actions" hidden>
    <span class="ac-actions-label">Actions</span>
    <div class="ac-list"></div>
  </aside>
</div>
`

const template = document.createElement("template")
template.innerHTML = markup

export function clone() {
  return template.content.cloneNode(true)
}
