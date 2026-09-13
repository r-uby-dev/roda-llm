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
   * The bar: the live line, the dot that separates it from the count, and
   * the count itself. It is composed from what the status and the actions
   * know, so it owns the pieces that sit between them. The count is always
   * there, even at zero; the dot only sits between the two when the live
   * line has something to say.
   */
  const bar = {
    separator: root.querySelector(".ac-trace-separator"),
    label: root.querySelector(".ac-trace-label"),
    paint() {
      const live = status.el.children.length > 0
      const count = actions.entries.size
      if (this.separator)
        this.separator.hidden = !live
      if (this.label)
        this.label.textContent = `${count} ${count === 1 ? "action" : "actions"}`
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
      // The dot in front of the count, and the count itself, follow from
      // what the live line has to say.
      bar.paint()
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
     * that is running, the trace carries how many have run. Its line
     * is reserved either way, so the tray does not resize under the
     * answer when the first call lands.
     */
    summarise() {
      bar.paint()
    },
    call(tool) {
      this.paint(tool, "call", labels.active(tool))
    },
    returned(tool) {
      this.paint(tool, "return", labels.done(tool))
    },
    /**
     * Anything still running when the turn ends is not running any
     * more: stop the pulse. The row keeps its text, so the trace still
     * shows what was called.
     */
    settle() {
      this.entries.forEach(row => row.classList.remove("is-running"))
    },
    clear() {
      this.entries.clear()
      this.list.replaceChildren()
      this.details.open = false
      this.summarise()
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
   * The memory meter. It reads whatever the describe route reports, and a
   * console that has heard nothing yet simply shows a full one: nothing
   * spent, everything available.
   */
  const memory = {
    meter: root.querySelector(".ac-memory-meter"),
    fill: root.querySelector(".ac-memory-fill"),
    value: root.querySelector(".ac-memory-value"),
    figure: root.querySelector(".ac-memory-help-figure"),
    render(data) {
      const used = Number(data?.context_used ?? 0)
      const available = Number(data?.context_available ?? 0)
      const left = available > 0 ? 100 - (used / available) * 100 : 100
      const percent = Math.round(Math.min(100, Math.max(0, left)))
      if (this.fill)
        this.fill.style.width = `${percent}%`
      if (this.value)
        this.value.textContent = `${percent}%`
      // The card behind the case is written in the template; the one thing
      // put in it here is the number, since the sentence around it is the
      // console's words and not its business.
      if (this.figure)
        this.figure.textContent = percent
      if (this.meter) {
        this.meter.setAttribute("aria-valuenow", String(percent))
        // The two bands are the console raising its voice: more than
        // half the context spent, and nearly all of it.
        this.meter.classList.toggle("is-critical", percent <= 20)
        this.meter.classList.toggle("is-low", percent > 20 && percent <= 50)
      }
    }
  }

  /**
   * The meter explains itself: an agent has a finite amount of memory, and
   * this is what is left of it. The explanation is a popover, so the bar's
   * own scrolling cannot clip it, and it sits above the meter - the top
   * layer does not place it for us, so the box does.
   */
  const help = {
    el: root.querySelector(".ac-memory-help"),
    meter: root.querySelector(".ac-memory-meter"),
    open() {
      const { el, meter } = this
      if (!el || !meter || typeof el.showPopover !== "function")
        return
      const box = meter.getBoundingClientRect()
      el.showPopover()
      this.opened = true
      const width = el.offsetWidth || 0
      const left = Math.min(
        Math.max(box.left, 8),
        Math.max(8, window.innerWidth - width - 8)
      )
      // Above the case by default, and below it when the page has no room
      // up there - a card that hangs off the top of the screen is no use.
      const below = box.top < (el.offsetHeight || 0) + 16
      el.style.left = `${Math.round(left)}px`
      el.style.top = `${Math.round(below ? box.bottom : box.top)}px`
      el.style.transform = below ? "translateY(0.5em)" : "translateY(calc(-100% - 0.5em))"
      el.classList.toggle("is-below", below)
    },
    close() {
      const { el } = this
      if (el && this.opened && typeof el.hidePopover === "function") {
        this.opened = false
        el.hidePopover()
      }
    }
  }

  if (help.meter) {
    help.meter.addEventListener("pointerenter", () => help.open())
    help.meter.addEventListener("pointerleave", () => help.close())
    help.meter.addEventListener("focus", () => help.open())
    help.meter.addEventListener("blur", () => help.close())
  }

  /**
   * Where the conversation got to, and how much memory it has left: one
   * question, asked as the console opens and again when a turn ends,
   * since a turn is what spends the memory. The answer to the first is
   * either the invitation the host slotted or the last thing that was
   * said; the meter follows every answer.
   *
   * A host with no session, no token or no route at all lands on the
   * invitation with a full meter, which is the truth: nothing is known to
   * have been spent.
   */
  const settle = (data) => {
    loading.hide()
    memory.render(data)
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
    },
    focus() {
      // Never scroll: focus follows the conversation, and the page
      // should hold still while it does.
      this.el.focus({ preventScroll: true })
    }
  }

  let buffer = ""
  let waiting = false
  // A console is untouched until its first turn: the describe answer may
  // put the last message where the invitation was, and once a turn has
  // run the answer owns that screen and only the meter still follows.
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
      actions.call(tool)
    },
    onToolReturn(tool) {
      activity.onToolReturn(tool)
      tool.count = activity.completed.get(tool.name) || 0
      waiting = true
      status.follow()
      actions.returned(tool)
    },
    onGoodbye(res) {
      activity.active.clear()
      actions.settle()
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
      actions.settle()
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
    // A turn reads as one turn: the answer, the count and the trace all
    // start empty, so the count is this turn's actions rather than a
    // running total, and what the last turn did has been read by now.
    actions.clear()
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
    actions.clear()
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
  // resting state rather than on an empty row.
  actions.summarise()
  status.follow()

  // And it asks where the conversation got to, which is what the opening
  // state - invitation or last message - and the memory meter come from.
  refresh()

  return self
}
