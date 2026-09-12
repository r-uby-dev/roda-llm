import { http } from "./http.js"
import { renderer } from "./renderer.js"
import { console as makeConsole } from "./console.js"
import { clone as cloneTemplate } from "./template.js"

class AgentConsole extends HTMLElement {
  static get observedAttributes() {
    return ["path", "agent", "csrf", "height", "expanded", "disabled", "prompt", "placeholder"]
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(cloneTemplate())
  }

  connectedCallback() {
    // The endpoint is matched on `agent` and is always
    // the relative route `agents/<agent>`. Being relative,
    // the browser resolves it against whatever the app is
    // mounted on: the outer mount point is the deployment's
    // concern, not the component's. `path` is only used as
    // an override when you diverge from that standard layout.
    const path = this.path || (this.agent ? `agents/${this.agent}` : "")
    const headers = this.headers()
    this.console = makeConsole({
      host: this,
      root: this.shadowRoot.querySelector(".ac-console"),
      http: http({ path, headers }),
      path,
      headers,
      renderer: renderer(),
      labels: this.labels
    })
    this.applyHeight(this.getAttribute("height"))
    this.applyPrompt(this.getAttribute("prompt"))
    this.applyPlaceholder(this.getAttribute("placeholder"))
    this.observePlaceholder()
    if (!this.disabled)
      this.focus()
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "height")
      this.applyHeight(newValue)
    if (name === "prompt")
      this.applyPrompt(newValue)
    if (name === "placeholder")
      this.applyPlaceholder(newValue)
    if (name === "expanded")
      this.applyExpanded(newValue !== null)
  }

  /**
   * Keep the shadow tree's expanded state in step with the host
   * attribute, so setting `expanded` from the page works the same
   * as pressing the console's own expand button.
   */
  applyExpanded(value) {
    const root = this.shadowRoot?.querySelector(".ac-console")
    if (root)
      root.classList.toggle("is-expanded", value)
  }

  /**
   * The composer's prompt, `$` unless the host names another.
   */
  applyPrompt(value) {
    const prompt = this.shadowRoot?.querySelector(".ac-prompt")
    if (prompt)
      prompt.textContent = value || "$"
  }

  /**
   * The composer's placeholder, in the same spirit as `prompt`.
   */
  applyPlaceholder(value) {
    const input = this.shadowRoot?.querySelector(".ac-input")
    if (input)
      input.placeholder = value || "Ask…"
  }

  /**
   * An explicit `height` attribute always wins. Otherwise the console
   * defaults to the height of the placeholder: it is exactly as tall
   * as whatever the host slots in, plus the input row around it.
   * Streaming then scrolls inside the console instead of resizing it.
   */
  applyHeight(value) {
    const root = this.shadowRoot?.querySelector(".ac-console")
    if (!root)
      return
    if (value) {
      root.style.setProperty("--ac-height", value)
      return
    }
    // Measured with no height in place, so the measurement is the box
    // the browser laid out: the placeholder, its margins, the console's
    // padding, the input row. Reconstructing it from the placeholder's
    // offsetHeight drops anything that sits outside its border box.
    root.style.removeProperty("--ac-height")
    const height = root.offsetHeight
    if (height > 0)
      root.style.setProperty("--ac-height", `${height}px`)
  }

  /**
   * Re-measure when the placeholder reflows, which happens when
   * webfonts load or the console is resized. Hiding the placeholder
   * is a reflow too - and the answer is empty at that moment, because
   * a turn clears it - so measure only while the placeholder is the
   * thing on screen, or the console collapses as a turn starts.
   */
  observePlaceholder() {
    const root = this.shadowRoot
    const placeholder = root?.querySelector(".ac-placeholder")
    const answer = root?.querySelector(".ac-answer")
    if (!placeholder || !answer)
      return
    const measurable = () =>
      !this.hasAttribute("height") && !placeholder.hidden && answer.childNodes.length === 0
    if ("ResizeObserver" in window) {
      this.observer?.disconnect()
      this.observer = new ResizeObserver(() => {
        if (measurable())
          this.applyHeight()
      })
      this.observer.observe(placeholder)
    }
    document.fonts?.ready.then(() => {
      if (measurable())
        this.applyHeight()
    })
  }

  disconnectedCallback() {
    this.observer?.disconnect()
    this.observer = undefined
  }

  get path() { return this.getAttribute("path") || "" }
  set path(v) { this.setAttribute("path", v) }

  get agent() { return this.getAttribute("agent") || "" }
  set agent(v) { this.setAttribute("agent", v) }

  get prompt() { return this.getAttribute("prompt") || "$" }
  set prompt(v) { this.setAttribute("prompt", v) }

  get placeholder() { return this.getAttribute("placeholder") || "Ask…" }
  set placeholder(v) { this.setAttribute("placeholder", v) }

  get disabled() { return this.hasAttribute("disabled") }
  set disabled(v) { v ? this.setAttribute("disabled", "") : this.removeAttribute("disabled") }

  reset() { this.console.reset() }
  focus() { this.console.focus() }
  talk(q) { this.console.talk(q) }
  clear() { this.console.clear() }

  headers() {
    // CSRF token resolution: "auto", "none", or a literal token string.
    const mode = this.getAttribute("csrf") || "auto"
    if (mode === "none") return {}
    const token = mode === "auto"
      ? document.querySelector('meta[name="_csrf"]')?.content
      : mode
    return token ? { "X-CSRF-Token": token } : {}
  }

  get labels() { return this._labels || {} }
  set labels(v) { this._labels = v || {} }
}

if (!customElements.get("agent-console")) {
  customElements.define("agent-console", AgentConsole)
}
