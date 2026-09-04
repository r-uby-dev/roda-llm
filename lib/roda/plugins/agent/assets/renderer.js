import { marked } from "marked"
import hljs from "highlight.js"

export function renderer() {
  const self = Object.create(null)

  self.render = (markdown, el) => {
    el.innerHTML = marked.parse(markdown)
    el.querySelectorAll("pre code").forEach(code => hljs.highlightElement(code))
    el.querySelectorAll("a").forEach(a => {
      a.target = "_blank"
      a.rel = "noopener"
    })
  }

  return self
}