import { http } from "./http.js"
import { renderer } from "./renderer.js"
import { console as makeConsole } from "./console.js"

class Agent extends HTMLElement {
  static get observedAttributes() {
    return ["path", "name", "csrf", "height", "expanded", "disabled"]
  }

  connectedCallback() {
    // The endpoint is matched on `name` and is always
    // the relative route `agents/<name>`. Being relative,
    // the browser resolves it against whatever the app is
    // mounted on: the outer mount point is the deployment's
    // concern, not the component's. `path` is only used as
    // an override when you diverge from that standard layout.
    const path = this.path || (this.name ? `agents/${this.name}` : "")
    this.console = makeConsole({
      root: this,
      http: http({ path, headers: this.headers() }),
      path,
      renderer: renderer(),
      labels: this.labels
    })
  }

  disconnectedCallback() {
    /* noop for now */
  }

  get path() { return this.getAttribute("path") || "" }
  set path(v) { this.setAttribute("path", v) }

  get name() { return this.getAttribute("name") || "" }
  set name(v) { this.setAttribute("name", v) }

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

if (!customElements.get("agent")) {
  customElements.define("agent", Agent)
}
