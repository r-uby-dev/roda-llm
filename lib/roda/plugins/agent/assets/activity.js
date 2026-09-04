export function activity() {
  const self = Object.create(null)
  self.active = new Map()
  self.completed = new Map()

  self.onToolCall = (id, name) => {
    self.active.set(id, name)
  }

  self.onToolReturn = (id, name) => {
    self.active.delete(id)
    self.completed.set(name, (self.completed.get(name) || 0) + 1)
  }

  return self
}