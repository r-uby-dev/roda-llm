export function stream(options = {}) {
  const self = Object.create(null)
  const { path } = options
  let eventSource = null

  self.onContent = options.onContent || (data => {})
  self.onToolCall = options.onToolCall || (data => {})
  self.onToolReturn = options.onToolReturn || (data => {})
  self.onGoodbye = options.onGoodbye || (data => {})
  self.onError = options.onError || (data => {})

  self.attach = (q) => {
    if (eventSource)
      return self
    const es = new EventSource(`${path}?q=${encodeURIComponent(q)}`)
    es.addEventListener("onContent", e => self.onContent(JSON.parse(e.data)))
    es.addEventListener("onToolCall", e => self.onToolCall(JSON.parse(e.data)))
    es.addEventListener("onToolReturn", e => self.onToolReturn(JSON.parse(e.data)))
    es.addEventListener("onGoodbye", e => { self.onGoodbye(JSON.parse(e.data)); es.close() })
    es.addEventListener("onToolError", e => { self.onError(JSON.parse(e.data)); es.close() })
    eventSource = es
    return self
  }

  self.close = () => {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
  }

  self.active = () => {
    return !!eventSource
  }

  return self
}