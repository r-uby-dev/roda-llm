import { http } from "./http.js"
import { renderer } from "./renderer.js"
import { console as makeConsole } from "./console.js"
import { clone as cloneTemplate } from "./template.js"

class AgentConsole extends HTMLElement {
  static get observedAttributes() {
    return ["path", "agent", "csrf", "height", "expanded", "disabled"]
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
    this.console = makeConsole({
      host: this,
      root: this.shadowRoot.querySelector(".ac-console"),
      http: http({ path, headers: this.headers() }),
      path,
      renderer: renderer(),
      labels: this.labels
    })
    this.applyHeight(this.getAttribute("height"))
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "height")
      this.applyHeight(newValue)
  }

  applyHeight(value) {
    const root = this.shadowRoot?.querySelector(".ac-console")
    if (!root)
      return
    if (value)
      root.style.setProperty("--ac-height", value)
    else
      root.style.removeProperty("--ac-height")
  }

  disconnectedCallback() {
    /* noop for now */
  }

  get path() { return this.getAttribute("path") || "" }
  set path(v) { this.setAttribute("path", v) }

  get agent() { return this.getAttribute("agent") || "" }
  set agent(v) { this.setAttribute("agent", v) }

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
