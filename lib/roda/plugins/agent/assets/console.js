import { stream as createStream } from "./stream.js"

export function console(options = {}) {
  const self = Object.create(null)

  const root = options.root.shadowRoot
  const status = root.querySelector(".ac-status")
  const answer = root.querySelector(".ac-answer")
  const input = root.querySelector(".ac-input")
  const reset = root.querySelector(".ac-reset")
  const expand = root.querySelector(".ac-expand")
  const labels = options.labels || {}

  let buffer = ""

  function showStatus(text) {
    status.textContent = text
    status.classList.add("is-active")
  }

  function hideStatus() {
    status.classList.remove("is-active")
    status.textContent = ""
  }

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
    onContent(data) {
      hideStatus()
      buffer += data.text
      options.renderer.render(buffer, answer)
    },
    onToolCall(data) {
      showStatus(labels[data.name] || "Working…")
    },
    onToolReturn() {},
    onGoodbye(data) {
      hideStatus()
      if (buffer.trim() === "" && data.answer) {
        options.renderer.render(data.answer, answer)
      }
    },
    onError(data) {
      hideStatus()
      answer.classList.add("is-error")
      let message = "Something went wrong. Please try again."
      try { message = data.error || message } catch {}
      answer.textContent = message
    }
  })

  self.talk = (q) => {
    if (stream.active()) return
    buffer = ""
    answer.innerHTML = ""
    answer.classList.remove("is-error")
    showStatus("Thinking…")
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