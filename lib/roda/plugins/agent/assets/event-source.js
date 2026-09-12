/**
 * EventSource over POST.
 *
 * The platform's EventSource only makes GET requests, so it cannot
 * carry a body - and a body is where a prompt belongs, with the
 * request that spends tokens kept off the URL. This speaks the same
 * protocol on the wire (`text/event-stream`, one `event:`/`data:`
 * pair per frame, a blank line to end it) and hands each event to a
 * listener as an Event with a `data` string, so it reads like the
 * interface it stands in for: `addEventListener`, `close`, and a
 * `readyState` that goes CONNECTING, OPEN, CLOSED.
 *
 * The differences are the ones POST demands: the request body is
 * yours to set, the response is checked before it is read as a
 * stream, and a failure arrives as an `error` event rather than the
 * silent reconnection EventSource does on its own.
 *
 *   const es = createEventSource({
 *     url: "agents/theo",
 *     headers: {"X-CSRF-Token": token},
 *     body: {q: "hello"}
 *   })
 *   es.addEventListener("onContent", event => console.log(event.data))
 */
export function createEventSource(options = {}) {
  const self = Object.create(null)
  const { url, body, headers, withCredentials = false } = options
  const method = options.method || "POST"
  const listeners = {}

  self.CONNECTING = 0
  self.OPEN = 1
  self.CLOSED = 2
  self.readyState = self.CONNECTING
  self.url = url

  let controller = null
  let buffer = ""

  /**
   * A body may be given as a plain object of fields, which is what a
   * form-encoded request wants, or as anything fetch already knows:
   * a string, URLSearchParams, FormData.
   */
  const payload = (() => {
    if (body == null)
      return undefined
    const known = typeof body === "string" || body instanceof URLSearchParams ||
      (typeof FormData !== "undefined" && body instanceof FormData)
    return known ? body : new URLSearchParams(body)
  })()

  const requestHeaders = payload instanceof URLSearchParams || payload == null
    ? { "Content-Type": "application/x-www-form-urlencoded", ...headers }
    : { ...headers }

  const dispatch = (type, data) => {
    const event = typeof MessageEvent === "function"
      ? new MessageEvent(type, { data })
      : { type, data }
    for (const listener of listeners[type] || [])
      listener(event)
  }

  const emit = (frame) => {
    let type = "message"
    const data = []
    for (const line of frame.split("\n")) {
      if (line.startsWith("event:"))
        type = line.slice(6).trim()
      else if (line.startsWith("data:"))
        data.push(line.slice(5).trim())
    }
    if (data.length)
      dispatch(type, data.join("\n"))
  }

  const drain = () => {
    let index
    while ((index = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, index)
      buffer = buffer.slice(index + 2)
      emit(frame)
    }
  }

  /**
   * Listen for the events the server names. Types are the ones the
   * writer chose: the agent endpoint sends onContent, onToolCall,
   * onToolReturn, onGoodbye and onError.
   */
  self.addEventListener = (type, listener) => {
    (listeners[type] ||= []).push(listener)
    return self
  }

  self.removeEventListener = (type, listener) => {
    listeners[type] = (listeners[type] || []).filter(fn => fn !== listener)
    return self
  }

  self.close = () => {
    if (self.readyState !== self.CLOSED) {
      self.readyState = self.CLOSED
      controller?.abort()
      controller = null
    }
  }

  self.active = () => self.readyState === self.OPEN || self.readyState === self.CONNECTING

  controller = new AbortController()
  const signal = controller.signal
  fetch(url, {
    method,
    headers: requestHeaders,
    body: payload,
    signal,
    credentials: withCredentials ? "include" : "same-origin"
  }).then(async (response) => {
    // A refused request (a missing or stale token, say) is not a
    // stream, so say what happened instead of reading an empty body
    // as one.
    if (!response.ok)
      throw new Error((await response.text()) || `${response.status}`)
    if (self.readyState === self.CLOSED)
      return
    self.readyState = self.OPEN
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    for (;;) {
      const { value, done } = await reader.read()
      if (done)
        break
      buffer += decoder.decode(value, { stream: true })
      drain()
    }
    self.close()
  }).catch((error) => {
    if (self.readyState === self.CLOSED || error.name === "AbortError") {
      self.close()
      return
    }
    self.close()
    const event = typeof MessageEvent === "function"
      ? new MessageEvent("error", { data: error.message || String(error) })
      : { type: "error", data: error.message || String(error), message: error.message }
    for (const listener of listeners.error || [])
      listener(event)
  })

  return self
}
