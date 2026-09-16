import { stream as createStream } from "./stream.js"
import { activity as createActivity } from "./activity.js"
import { panels as createPanels } from "./panels.js"

export function console(options = {}) {
  const self      = Object.create(null)
  const host      = options.host
  const root      = options.root
  const answer    = root.querySelector(".ac-answer")
  const form      = root.querySelector(".ac-form")
  const reset     = root.querySelector(".ac-reset")
  const expand    = root.querySelector(".ac-expand")
  const activity  = createActivity()

/**
 * Panels: <agent-panel> children, plus whatever
 * the host set on the element. Same descriptors.
 */
  const panels = createPanels({root, host})
  const slot = root.querySelector('slot[name="panels"]')
  const declared = () =>
    (slot?.assignedElements() || [])
      .filter((el) => el.localName === "agent-panel")
      .map((el) => el.panel())
  const collect = () => [...declared(), ...(options.panels || [])].filter(Boolean)
  if (slot)
    slot.addEventListener("slotchange", () => panels.set(collect()))
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
   * The status line says one thing: what the console is doing. That is the
   * tool that is running, "Thinking…" while the turn waits on the model,
   * and nothing at all in between - an idle bar does not need to say it is
   * idle. It is always on screen, so the bar never blinks out between one
   * moment of a turn and the next.
   */
  const status = {
    el: root.querySelector(".ac-status"),
    thinking: "Thinking…",
    render({ text, icon, thinking }) {
      const { el } = this
      el.replaceChildren()
      if (icon)
        el.append(icon.cloneNode(true))
      if (text != null) {
        const span = document.createElement("span")
        span.textContent = text
        if (thinking)
          span.className = "is-thinking"
        el.append(span)
      }
    },
    follow() {
      const running = [...activity.active.keys()].pop()
      if (running != null) {
        this.render(labels.active({id: running, name: activity.active.get(running)}))
        return
      }
      if (waiting) {
        this.render({text: this.thinking, thinking: true})
        return
      }
      this.render({})
    }
  }


  const placeholder = {
    el: root.querySelector(".ac-placeholder"),
    last: root.querySelector(".ac-last-message"),
    show() {
      const { el } = this
      el.hidden = false
      if (this.last)
        this.last.hidden = true
    },
    hide() {
      const { el } = this
      el.hidden = true
      if (this.last)
        this.last.hidden = true
    },
    /**
     * Open on the last thing that was said. It takes the invitation's
     * place in the column rather than covering it, and is rendered the
     * way an answer is, because it was one: the console keeps the height
     * the invitation gave it, and the body scrolls the message the way
     * it scrolls an answer.
     */
    restore(message) {
      if (!this.last)
        return
      options.renderer.render(message, this.last)
      this.el.classList.add("is-restored")
      this.el.hidden = true
      this.last.hidden = false
    },
    forget() {
      if (!this.last)
        return
      this.el.classList.remove("is-restored")
      this.el.hidden = false
      this.last.hidden = true
      this.last.innerHTML = ""
    }
  }

  /**
   * The console asks where the conversation got to before it can say
   * anything, so it opens saying that, and the answer to the question is
   * either the invitation the host slotted or the last thing that was
   * said. Both go through restore(): the element resolves the loading
   * state whether the app answered, refused or was never asked.
   */
  const loading = {
    el: root.querySelector(".ac-loading"),
    show() {
      if (this.el)
        this.el.hidden = false
    },
    hide() {
      if (this.el)
        this.el.hidden = true
    }
  }

  placeholder.hide()
  loading.show()

/**
 * Where the conversation got to: asked on open
 * and after each turn, since a turn moves it on.
 */
  const settle = (data) => {
    loading.hide()
/**
 * The describe answer, announced for whoever
 * wants it: what it means is their business.
 */
    host.dispatchEvent(new CustomEvent("describe", {detail: data}))
    if (started)
      return
    if (data?.last_message)
      placeholder.restore(data.last_message)
    else
      placeholder.show()
  }

  const refresh = async () => {
    try {
      const response = await options.http.describe()
      if (!response.ok)
        throw new Error(String(response.status))
      settle(await response.json())
    } catch {
      settle(undefined)
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
      // What the prompt reads to know a turn is running, and what the
      // page can read from the host.
      root.classList.toggle("is-busy", value)
      host.toggleAttribute("busy", value)
      // The field says what is happening while it waits, and goes back
      // to what the host asked for when the turn is over.
      if (value) {
        this.resting = this.el.placeholder
        this.el.placeholder = "Working on your request..."
      } else if (this.resting) {
        this.el.placeholder = this.resting
        this.resting = null
      }
    },
    focus() {
      // Never scroll: focus follows the conversation, and the page
      // should hold still while it does.
      this.el.focus({ preventScroll: true })
    }
  }

  let buffer = ""
  let waiting = false
  /**
   * Untouched until the first turn: describe may put
   * the last message where the invitation was.
   */
  let started = false

  const stream = createStream({
    path: options.path,
    headers: options.headers,
    onContent(content) {
      waiting = false
      status.follow()
      placeholder.hide()
      buffer += content.text
      options.renderer.render(buffer, answer)
    },
    onToolCall(tool) {
      activity.onToolCall(tool)
      waiting = false
      status.follow()
    },
    onToolReturn(tool) {
      activity.onToolReturn(tool)
      waiting = true
      status.follow()
    },
    onGoodbye(res) {
      activity.active.clear()
      waiting = false
      status.follow()
      input.busy(false)
      if (buffer.trim() === "" && res.answer) {
        options.renderer.render(res.answer, answer)
      }
      refresh()
    },
    onError(data) {
      activity.active.clear()
      waiting = false
      status.follow()
      input.busy(false)
      placeholder.hide()
      answer.classList.add("is-error")
      let message = "Something went wrong. Please try again."
      try { message = data.error || message } catch {}
      answer.textContent = message
      refresh()
    }
  })

  self.talk = (q) => {
    if (stream.active())
      return
    started = true
    activity.active.clear()
    activity.completed.clear()
    buffer = ""
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    placeholder.hide()
    input.busy(true)
    waiting = true
      // A turn reads as one turn: the answer and the live line start empty.
    status.follow()
    stream.attach(q)
    input.clear()
    input.focus()
  }

  /**
   * The describe request has come back: show what it reported, or the
   * host's invitation when there was nothing to report. Either way the
   * console stops saying it is loading.
   */
  self.restore = (data) => {
    loading.hide()
    if (data?.last_message)
      placeholder.restore(data.last_message)
    else
      placeholder.show()
  }

  self.reset = async () => {
    stream.close()
    try { await options.http.destroy() } catch {}
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    placeholder.forget()
    placeholder.show()
    activity.active.clear()
    activity.completed.clear()
    waiting = false
    started = false
    status.follow()
    input.busy(false)
    input.focus()
    refresh()
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

  // The bar is on screen from the start, so the console opens on its
  // resting state rather than on an empty line.
  status.follow()

  /**
   * Where the conversation got to: the invitation,
   * or the last message.
   */
  refresh()

  panels.set(collect())

  /**
   * The host's panels, for a console already on the page. A console with
   * <agent-panel> children needs none of this: same descriptors, and the
   * two compose.
   */
  self.setPanels = (items) => {
    options.panels = items || []
    panels.set(collect())
  }

  return self
}
