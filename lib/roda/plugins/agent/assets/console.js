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
  const status = {
    el: root.querySelector(".ac-status"),
    show() {
      this.el.classList.add("is-active")
    },
    hide() {
      this.el.classList.remove("is-active")
    },
    thinking() {
      const { el } = this
      el.replaceChildren()
      const span = document.createElement("span")
      span.textContent = "Thinking…"
      el.append(span)
      this.show()
    }
  }

  /**
   * The actions the agent has taken: one row per tool call, keyed by
   * call id so parallel calls to the same tool keep separate rows.
   * A row goes from its call state to its return state and stays put,
   * so the console can be read back after the turn is over.
   */
  const actions = {
    el: root.querySelector(".ac-actions"),
    list: root.querySelector(".ac-list"),
    entries: new Map(),
    row(tool) {
      const { entries } = this
      let row = entries.get(tool.id)
      if (!row) {
        row = document.createElement("div")
        row.className = "ac-action"
        entries.set(tool.id, row)
        // Newest first: recent activity is always at the top, and the
        // sidebar follows it back up rather than leaving it offscreen.
        this.list.prepend(row)
        this.el.scrollTop = 0
      }
      return row
    },
    paint(tool, { text, icon }) {
      const row = this.row(tool)
      row.replaceChildren()
      if (icon)
        row.append(icon.cloneNode(true))
      if (text != null) {
        const span = document.createElement("span")
        span.textContent = text
        row.append(span)
      }
      this.el.hidden = false
    },
    call(tool) {
      this.paint(tool, labels.active(tool))
    },
    returned(tool) {
      this.paint(tool, labels.done(tool))
    },
    clear() {
      this.entries.clear()
      this.list.replaceChildren()
      this.el.hidden = true
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

  const body = {
    el: root.querySelector(".ac-body"),
    toTop() {
      const { el } = this
      el.scrollTop = 0
    },
    toBottom() {
      const { el } = this
      el.scrollTop = el.scrollHeight
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
      status.hide()
      placeholder.hide()
      buffer += content.text
      options.renderer.render(buffer, answer)
      body.toBottom()
    },
    onToolCall(tool) {
      activity.onToolCall(tool)
      status.hide()
      actions.call(tool)
    },
    onToolReturn(tool) {
      activity.onToolReturn(tool)
      tool.count = activity.completed.get(tool.name) || 0
      actions.returned(tool)
    },
    onGoodbye(res) {
      status.hide()
      input.busy(false)
      if (buffer.trim() === "" && res.answer) {
        options.renderer.render(res.answer, answer)
        body.toBottom()
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
      body.toBottom()
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
    body.toTop()
    status.thinking()
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
    body.toTop()
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
    expand.setAttribute("aria-expanded", expanded ? "true" : "false")
    expand.title = expanded ? "Collapse chat" : "Expand chat"
    input.focus()
  })

  return self
}
