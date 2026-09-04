import { http } from "./http.js"
import { renderer } from "./renderer.js"
import { console as makeConsole } from "./console.js"

class Agent extends HTMLElement {
  static get observedAttributes() {
    return ["path", "csrf", "height", "expanded", "disabled", "tool-labels"]
  }

  connectedCallback() {
    this.console = makeConsole({
      root: this,
      http: http({ path: this.path, headers: this.headers() }),
      path: this.path,
      renderer: renderer(),
      labels: this.toolLabels()
    })
  }

  disconnectedCallback() {
    /* noop for now */
  }

  get path() { return this.getAttribute("path") || "" }
  set path(v) { this.setAttribute("path", v) }

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

  toolLabels() {
    try { return JSON.parse(this.getAttribute("tool-labels")) || {} }
    catch { return {} }
  }
}

if (!customElements.get("agent")) {
  customElements.define("agent", Agent)
}