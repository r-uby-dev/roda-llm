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

export function renderer() {
  const self = Object.create(null)

  self.render = (markdown, el) => {
    el.innerHTML = marked.parse(markdown)
    el.querySelectorAll("pre code").forEach(code => highlight(code))
    el.querySelectorAll("a").forEach(a => {
      a.target = "_blank"
      a.rel = "noopener"
    })
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
