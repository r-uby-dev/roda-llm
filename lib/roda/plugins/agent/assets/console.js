import { stream as createStream } from "./stream.js"
import { activity as createActivity } from "./activity.js"

export function console(options = {}) {
  const self      = Object.create(null)
  const host      = options.root
  const root      = host.shadowRoot
  const answer    = root.querySelector(".ac-answer")
  const input     = root.querySelector(".ac-input")
  const reset     = root.querySelector(".ac-reset")
  const expand    = root.querySelector(".ac-expand")
  const activity  = createActivity()
  const labels    = {
    data: { ...(options.labels || {}), fallback: { text: "Working…" } },
    for(name) {
      const { data } = this
      return data[name] || data["*"] || data["default"] || data.fallback
    },
    slot(name, field) {
      for (const el of host.children) {
        const s = el.getAttribute("slot")
        if (s === `label.${name}.${field}` || s === `label.*.${field}`)
          return el
      }
    },
    text(name, state, tool) {
      const field = state === "done" ? "done" : "text"
      const node = this.slot(name, field)
      if (node)
        return node.textContent
      const label = this.for(name)
      switch (state) {
        case "done":
          return typeof label === "string"
            ? (!tool.count ? undefined : label)
            : label.done
        default:
          return typeof label === "string" ? label : label.text
      }
    },
    icon(name, state) {
      const field = state === "done" ? "doneIcon" : "icon"
      const node = this.slot(name, field)
      if (node)
        return node
      const label = this.for(name)
      return (typeof label === "object" && label) ? label[field] : undefined
    },
    resolve(tool, state) {
      let text = this.text(tool.name, state, tool)
      if (typeof text === "function")
        text = text(tool)
      if (typeof text === "string")
        text = text.replace(/\{count\}/g, tool.count ?? "")
      return { text, icon: this.icon(tool.name, state) }
    },
    active(tool) {
      return this.resolve(tool, "active")
    },
    done(tool) {
      return this.resolve(tool, "done")
    }
  }
  const status    = {
    el: root.querySelector(".ac-status"),
    show(text) {
      const { el } = this
      el.classList.add("is-active")
      el.textContent = text
    },
    hide() {
      const { el } = this
      el.classList.remove("is-active")
      el.textContent = ""
    },
    render({ text, icon }) {
      const { el } = this
      if (text == null && icon == null) {
        this.hide()
        return
      }
      this.hide()
      if (text != null) {
        const span = document.createElement("span")
        span.textContent = text
        el.append(span)
      }
      if (icon)
        el.append(icon.cloneNode(true))
      el.classList.add("is-active")
    }
  }

  let buffer = ""

  function renderGreeting() {
    const slot = root.querySelector('slot[name="greeting"]')
    if (slot) {
      answer.innerHTML = ""
      const clone = slot.cloneNode(true)
      slot.replaceChildren(...clone.children)
      answer.append(...clone.children)
    }
  }

  const stream = createStream({
    path: options.path,
    onContent(content) {
      status.hide()
      buffer += content.text
      options.renderer.render(buffer, answer)
    },
    onToolCall(tool) {
      activity.onToolCall(tool)
      status.render(labels.active(tool))
    },
    onToolReturn(tool) {
      activity.onToolReturn(tool)
      if (activity.active.size === 0) {
        tool.count = activity.completed.get(tool.name) || 0
        status.render(labels.done(tool))
      }
    },
    onGoodbye(res) {
      status.hide()
      if (buffer.trim() === "" && res.answer) {
        options.renderer.render(res.answer, answer)
      }
    },
    onError(data) {
      status.hide()
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
    status.show("Thinking…")
    stream.attach(q)
    input.value = ""
  }

  self.reset = async () => {
    stream.close()
    try { await options.http.destroy() } catch {}
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    renderGreeting()
  }

  self.focus = () => {
    return input.focus()
  }

  self.clear = () => {
    answer.innerHTML = ""
    answer.classList.remove("is-error")
  }

  reset.addEventListener("click", self.reset)
  expand.addEventListener("click", () => {
    const expanded = root.classList.toggle("is-expanded")
    expand.setAttribute("aria-expanded", expanded ? "true" : "false")
    expand.title = expanded ? "Collapse chat" : "Expand chat"
    if (expanded) input.focus()
  })

  return self
}
