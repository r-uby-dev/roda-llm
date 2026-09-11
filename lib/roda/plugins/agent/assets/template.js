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
    /* The console keeps its size: whatever is too tall to fit
       scrolls inside it, so streaming neither resizes the console
       nor moves the content below it. */
    --ac-height: 12rem;
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
    flex-direction: column;
    gap: var(--ac-gap);
    height: var(--ac-height);
    overflow: hidden;
    padding: 0.625rem;
  }

  :host([expanded]) .ac-console,
  .ac-console.is-expanded {
    height: var(--ac-expanded-height);
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

  .ac-input:disabled { opacity: 0.6; }

  .ac-actions {
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
  <div class="ac-body" part="body">
    <div class="ac-answer" part="answer"></div>

    <div class="ac-placeholder" part="placeholder">
      <slot name="placeholder"><span>Ask me anything.</span></slot>
    </div>
  </div>

  <div class="ac-status" part="status" aria-live="polite"></div>

  <form class="ac-form" part="form">
    <input class="ac-input" part="input" type="text" autocomplete="off" placeholder="Ask…" aria-label="Message">

    <div class="ac-actions">
      <button class="ac-expand" part="expand" type="button" aria-expanded="false" title="Expand chat">&#x26F6;</button>
      <button class="ac-reset" part="reset" type="button" title="Reset console">&#x21BA;</button>
    </div>
  </form>
</div>
`

const template = document.createElement("template")
template.innerHTML = markup

export function clone() {
  return template.content.cloneNode(true)
}
