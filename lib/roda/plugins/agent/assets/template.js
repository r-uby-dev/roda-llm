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
    /* No default height: the console is as tall as what it renders
       (a server-rendered placeholder, say) until a height is set
       explicitly, through the height attribute or --ac-height. */
    --ac-expanded-height: 28rem;
    --ac-radius: 0.5rem;
    --ac-gap: 0.5rem;
    --ac-border: rgba(128, 128, 128, 0.35);
    --ac-surface: rgba(128, 128, 128, 0.12);
    --ac-muted: rgba(128, 128, 128, 1);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .ac-console {
    align-items: stretch;
    background: var(--ac-surface);
    border: 1px solid var(--ac-border);
    border-radius: var(--ac-radius);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: var(--ac-gap);
    height: var(--ac-height, auto);
    overflow: hidden;
    padding: 0.625rem;
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
  }

  .ac-answer { flex: 0 0 auto; }

  .ac-answer > :first-child { margin-top: 0; }
  .ac-answer > :last-child { margin-bottom: 0; }
  .ac-answer.is-error { color: #b3261e; }

  .ac-answer pre {
    background: var(--ac-surface);
    border-radius: var(--ac-radius);
    overflow: auto;
    padding: 0.5rem;
  }

  .ac-answer code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.875em;
  }

  .ac-placeholder { color: var(--ac-muted); }

  .ac-status {
    align-items: center;
    color: var(--ac-muted);
    display: none;
    font-size: 0.875em;
    gap: 0.375rem;
  }

  .ac-status.is-active { display: flex; }

  /* The actions the agent took: a sidebar beside the answer, so the
     log never takes room from the answer or resizes the console. It
     scrolls on its own once it outgrows the console. */
  .ac-actions {
    border-left: 1px solid var(--ac-border);
    box-sizing: border-box;
    color: var(--ac-muted);
    flex: 0 0 var(--ac-sidebar-width, 13rem);
    font-size: 0.875em;
    gap: 0.25rem;
    max-width: 50%;
    overflow: auto;
    overflow-wrap: anywhere;
    padding-left: 0.625rem;
  }

  .ac-actions:not([hidden]) {
    display: flex;
    flex-direction: column;
  }

  .ac-actions-label {
    font-size: 0.75em;
    letter-spacing: 0.05em;
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
    gap: 0.375rem;
    min-width: 0;
  }

  /* Default icons, used when the host slots none of its own. */
  .ac-icon {
    flex: none;
    height: 1em;
    width: 1em;
  }

  .ac-form {
    align-items: center;
    display: flex;
    gap: var(--ac-gap);
  }

  .ac-input {
    background: transparent;
    border: 1px solid var(--ac-border);
    border-radius: var(--ac-radius);
    color: inherit;
    flex: 1 1 auto;
    font: inherit;
    min-width: 0;
    padding: 0.375rem 0.5rem;
  }

  .ac-input:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }

  .ac-input:read-only { opacity: 0.6; }

  .ac-buttons {
    display: flex;
    gap: 0.25rem;
  }

  .ac-expand,
  .ac-reset {
    background: transparent;
    border: 1px solid var(--ac-border);
    border-radius: var(--ac-radius);
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: 1;
    padding: 0.375rem 0.5rem;
  }

  .ac-expand:hover,
  .ac-reset:hover { background: var(--ac-surface); }
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
      <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask…" aria-label="Message">

      <div class="ac-buttons">
        <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat">&#x26F6;</button>
        <button class="ac-reset" part="reset" type="button" title="Reset console">&#x21BA;</button>
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
