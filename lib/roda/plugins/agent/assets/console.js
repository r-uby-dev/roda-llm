import { stream as createStream } from "./stream.js"
import { activity as createActivity } from "./activity.js"

export function console(options = {}) {
  const self      = Object.create(null)
  const host      = options.host
  const root      = options.root
  const answer    = root.querySelector(".ac-answer")
  const form      = root.querySelector(".ac-form")
  const reset     = root.querySelector(".ac-reset")
  const expand    = root.querySelector(".ac-expand")
  const activity  = createActivity()
  const labels    = {
    data: {
      ...(options.labels || {}),
      fallback: {
        call: "Running {name} tool…",
        return: "Tool {name} finished"
      }
    },
    for(name) {
      const { data } = this
      return data[name] || data["*"] || data["default"] || data.fallback
    },
    slot(name, field) {
      for (const el of host.children) {
        const s = el.getAttribute("slot")
        if (s === `tool.${name}.${field}` || s === `tool.*.${field}`)
          return el
      }
    },
    text(name, state, tool) {
      const field = state === "return" ? "return" : "call"
      const node = this.slot(name, field)
      if (node)
        return node.textContent
      const label = this.for(name)
      switch (state) {
        case "return":
          return typeof label === "string"
            ? (!tool.count ? undefined : label)
            : label["return"]
        default:
          return typeof label === "string" ? label : label.call
      }
    },
    icon(name, state) {
      const field = state === "return" ? "return-icon" : "call-icon"
      const node = this.slot(name, field)
      if (node)
        return node
      const label = this.for(name)
      if (typeof label === "object" && label && label[field])
        return label[field]
      return icons.default(state)
    },
    substitute(text, tool) {
      return text.replace(/\{(\w+)(?:\.(\w+))?\}/g, (_, top, key) => {
        if (top === "arguments")
          return key ? tool.arguments?.[key] ?? "" : ""
        return tool[top] ?? ""
      })
    },
    resolve(tool, state) {
      let text = this.text(tool.name, state, tool)
      if (typeof text === "function")
        text = text(tool)
      if (typeof text === "string")
        text = this.substitute(text, tool)
      return { text, icon: this.icon(tool.name, state) }
    },
    active(tool) {
      return this.resolve(tool, "active")
    },
    done(tool) {
      return this.resolve(tool, "return")
    }
  }
  /**
   * The status line says one thing: which tool is running. It is not
   * a "thinking" line, so it stays out of the way until a call is in
   * flight, and goes away again when the last one returns.
   */
  const status = {
    el: root.querySelector(".ac-status"),
    show() {
      this.el.classList.add("is-active")
    },
    hide() {
      const { el } = this
      el.classList.remove("is-active")
      el.replaceChildren()
    },
    render({ text, icon }) {
      const { el } = this
      el.replaceChildren()
      if (icon)
        el.append(icon.cloneNode(true))
      if (text != null) {
        const span = document.createElement("span")
        span.textContent = text
        el.append(span)
      }
      this.show()
    },
    /**
     * Follow the tools that are still running, or step aside.
     */
    follow() {
      const running = [...activity.active.keys()].pop()
      if (running == null) {
        this.hide()
        return
      }
      const tool = {id: running, name: activity.active.get(running)}
      this.render(labels.active(tool))
    }
  }

  /**
   * The actions the agent has taken: one row per tool call, keyed by
   * call id so parallel calls to the same tool keep separate rows.
   * A row goes from its call state to its return state and stays put,
   * so the console can be read back after the turn is over.
   */
  const actions = {
    el: root.querySelector(".ac-trace"),
    details: root.querySelector(".ac-trace-details"),
    list: root.querySelector(".ac-trace-list"),
    label: root.querySelector(".ac-trace-label"),
    entries: new Map(),
    row(tool) {
      const { entries } = this
      let row = entries.get(tool.id)
      if (!row) {
        row = document.createElement("div")
        row.className = "ac-action"
        entries.set(tool.id, row)
        // A trace, so it reads in the order it happened.
        this.list.append(row)
      }
      return row
    },
    paint(tool, state, { text, icon }) {
      const row = this.row(tool)
      row.classList.toggle("is-running", state === "call")
      row.classList.toggle("is-done", state === "return")
      row.replaceChildren()
      if (icon)
        row.append(icon.cloneNode(true))
      if (text != null) {
        const span = document.createElement("span")
        span.textContent = text
        row.append(span)
      }
      this.el.hidden = false
      this.summarise()
    },
    /**
     * The summary line is a count: the status line carries the tool
     * that is running, the trace carries how many have run.
     */
    summarise() {
      const count = this.entries.size
      this.label.textContent = `${count} ${count === 1 ? "action" : "actions"}`
    },
    call(tool) {
      this.paint(tool, "call", labels.active(tool))
    },
    returned(tool) {
      this.paint(tool, "return", labels.done(tool))
    },
    clear() {
      this.entries.clear()
      this.list.replaceChildren()
      this.el.hidden = true
      this.details.open = false
      this.label.textContent = ""
    }
  }

  const placeholder = {
    el: root.querySelector(".ac-placeholder"),
    show() {
      const { el } = this
      el.hidden = false
    },
    hide() {
      const { el } = this
      el.hidden = true
    }
  }

  // Icons the console falls back to when the host slots none of its
  // own, so a tool call and a tool return are still legible.
  const icons = {
    el: root,
    default(state) {
      const { el } = this
      const template = el.querySelector(state === "return" ? ".ac-icon-return" : ".ac-icon-call")
      return template ? template.content.cloneNode(true) : undefined
    }
  }

  const input = {
    el: root.querySelector(".ac-input"),
    get value() {
      return this.el.value
    },
    clear() {
      this.el.value = ""
    },
    busy(value) {
      // Read-only rather than disabled: a disabled field loses focus,
      // so a turn would drop the caret the user just typed with.
      this.el.readOnly = value
    },
    focus() {
      // Never scroll: focus follows the conversation, and the page
      // should hold still while it does.
      this.el.focus({ preventScroll: true })
    }
  }

  let buffer = ""

  const stream = createStream({
    path: options.path,
    onContent(content) {
      status.follow()
      placeholder.hide()
      buffer += content.text
      options.renderer.render(buffer, answer)
    },
    onToolCall(tool) {
      activity.onToolCall(tool)
      status.follow()
      actions.call(tool)
    },
    onToolReturn(tool) {
      activity.onToolReturn(tool)
      tool.count = activity.completed.get(tool.name) || 0
      status.follow()
      actions.returned(tool)
    },
    onGoodbye(res) {
      status.hide()
      input.busy(false)
      if (buffer.trim() === "" && res.answer) {
        options.renderer.render(res.answer, answer)
      }
    },
    onError(data) {
      status.hide()
      input.busy(false)
      placeholder.hide()
      answer.classList.add("is-error")
      let message = "Something went wrong. Please try again."
      try { message = data.error || message } catch {}
      answer.textContent = message
    }
  })

  self.talk = (q) => {
    if (stream.active())
      return
    activity.active.clear()
    activity.completed.clear()
    buffer = ""
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    placeholder.hide()
    input.busy(true)
    status.hide()
    actions.clear()
    stream.attach(q)
    input.clear()
    input.focus()
  }

  self.reset = async () => {
    stream.close()
    try { await options.http.destroy() } catch {}
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    placeholder.show()
    status.hide()
    actions.clear()
    input.busy(false)
    input.focus()
  }

  self.focus = () => {
    return input.focus()
  }

  self.clear = () => {
    answer.innerHTML = ""
    answer.classList.remove("is-error")
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const q = input.value.trim()
    if (q) self.talk(q)
  })

  reset.addEventListener("click", self.reset)
  expand.addEventListener("click", () => {
    const expanded = root.classList.toggle("is-expanded")
    /**
     * Mirror the state onto the host, so the page that owns the
     * console can react to it - an expanded console usually wants
     * to leave the page's flow and take the viewport.
     */
    host.toggleAttribute("expanded", expanded)
    expand.setAttribute("aria-expanded", expanded ? "true" : "false")
    expand.title = expanded ? "Collapse chat" : "Expand chat"
    input.focus()
  })

  return self
}
