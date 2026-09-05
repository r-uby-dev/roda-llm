export function activity() {
  const self = Object.create(null)
  self.active = new Map()
  self.completed = new Map()

  self.onToolCall = (tool) => {
    self.active.set(tool.id, tool.name)
  }

  self.onToolReturn = (tool) => {
    self.active.delete(tool.id)
    self.completed.set(tool.name, (self.completed.get(tool.name) || 0) + 1)
  }

  return self
}