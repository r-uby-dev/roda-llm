export function http(options = {}) {
  const self = Object.create(null)
  const { path, headers } = options

  self.request = (method, q) => {
    const target = `${path}${q ? "?" + encodeURIComponent(q) : ""}`
    return fetch(target, { method, headers })
  }

  self.create = () => self.request("POST")
  self.destroy = () => self.request("DELETE")
  self.describe = () => self.request("GET")

  return self
}