import { marked } from "marked"
import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-json"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-shell-session"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"

Prism.languages.rb = Prism.languages.ruby
Prism.languages.cjs = Prism.languages.javascript
Prism.languages.mjs = Prism.languages.javascript
Prism.languages.js = Prism.languages.javascript
Prism.languages.ts = Prism.languages.typescript
Prism.languages.shell = Prism.languages.bash
Prism.languages.sh = Prism.languages.bash
Prism.languages.yaml = Prism.languages.yml

/**
 * Renders a streaming answer without rebuilding it on every chunk.
 *
 * Everything up to the last blank line is settled: it is parsed once and
 * then only appended to, so the nodes above the reader are never
 * replaced, and the scroll position holds still as the answer arrives.
 * Only the trailing block - still being written, and still able to
 * parse differently as it grows - is re-rendered.
 *
 * @return {Object}
 */
export function renderer() {
  const self = Object.create(null)
  const rendered = new WeakMap()

  self.render = (markdown, el) => {
    const cut = markdown.lastIndexOf("\n\n")
    const settled = cut < 0 ? "" : markdown.slice(0, cut)
    const tail = cut < 0 ? markdown : markdown.slice(cut)

    let state = rendered.get(el)
    if (!state || state.head.parentNode !== el || state.tail.parentNode !== el) {
      el.replaceChildren()
      const head = document.createElement("div")
      const rest = document.createElement("div")
      head.className = "ac-render-settled"
      rest.className = "ac-render-tail"
      el.append(head, rest)
      state = {head, tail: rest, settled: ""}
      rendered.set(el, state)
    }

    if (settled !== state.settled) {
      if (settled.startsWith(state.settled)) {
        append(state.head, settled.slice(state.settled.length))
      } else {
        state.head.replaceChildren()
        append(state.head, settled)
      }
      state.settled = settled
    }

    state.tail.replaceChildren()
    append(state.tail, tail)
  }

  /**
   * Parse a piece of markdown into a detached fragment, then move it in
   * one go: nothing is inserted into the answer before it is complete.
   *
   * @param {Element} el
   * @param {String} markdown
   * @return {void}
   */
  function append(el, markdown) {
    if (!markdown)
      return
    const template = document.createElement("template")
    template.innerHTML = marked.parse(markdown)
    template.content.querySelectorAll("pre code").forEach(highlight)
    template.content.querySelectorAll("a").forEach(external)
    el.append(template.content)
  }

  function external(a) {
    a.target = "_blank"
    a.rel = "noopener"
  }

  function highlight(code) {
    const match = /\blanguage-([\w-]+)/.exec(code.className || "")
    const lang = match && match[1]
    if (lang && Prism.languages[lang]) {
      code.className = `language-${lang}`
      code.innerHTML = Prism.highlight(code.textContent, Prism.languages[lang], lang)
    }
  }

  return self
}
