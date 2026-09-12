import { createEventSource } from "./event-source.js"

/**
 * The console's end of a turn: one stream per turn, addressed by the
 * agent's path, with the prompt in the body. The events are the ones
 * the agent endpoint sends, so this is a thin naming of them over the
 * createEventSource interface - the console gets `onContent`, `onToolCall`,
 * `onToolReturn`, `onGoodbye` and `onError`, and a failed request is
 * reported as an error like any other.
 */
export function stream(options = {}) {
  const self = Object.create(null)
  const { path, headers } = options
  const events = ["onContent", "onToolCall", "onToolReturn", "onGoodbye", "onError"]
  let source = null

  self.onContent = options.onContent || (data => {})
  self.onToolCall = options.onToolCall || (data => {})
  self.onToolReturn = options.onToolReturn || (data => {})
  self.onGoodbye = options.onGoodbye || (data => {})
  self.onError = options.onError || (data => {})

  self.attach = (q) => {
    if (source)
      return self
    const es = createEventSource({ url: path, headers, body: { q } })
    for (const type of events) {
      es.addEventListener(type, (event) => {
        self[type]?.(JSON.parse(event.data))
        if (type === "onGoodbye" || type === "onError")
          self.close()
      })
    }
    es.addEventListener("error", (event) => {
      self.onError({ error: event.data })
      self.close()
    })
    source = es
    return self
  }

  self.close = () => {
    if (source) {
      source.close()
      source = null
    }
  }

  self.active = () => {
    return !!source
  }

  return self
}
