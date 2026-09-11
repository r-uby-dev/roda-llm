import { marked } from "marked"
import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-markup-templating"
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
import "prismjs/components/prism-erb"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-toml"
import "prismjs/components/prism-ini"
import "prismjs/components/prism-diff"
import "prismjs/components/prism-http"
import "prismjs/components/prism-docker"
import "prismjs/components/prism-makefile"
import "prismjs/components/prism-nginx"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-go"
import "prismjs/components/prism-java"
import "prismjs/components/prism-rust"

/**
 * The names writers actually use, mapped onto the grammars above, so a
 * fence saying ```gemspec or ```console still highlights. Everything a
 * reader is likely to meet in a Ruby, Rack or Rails conversation is
 * here; a language we do not ship is left as plain code rather than
 * guessed at.
 */
const aliases = {
  rb: "ruby",
  gemfile: "ruby",
  gemspec: "ruby",
  irb: "ruby",
  rake: "ruby",
  rails: "ruby",
  ru: "ruby",
  yml: "yaml",
  html: "markup",
  htm: "markup",
  xml: "markup",
  svg: "markup",
  xhtml: "markup",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  zsh: "bash",
  ksh: "bash",
  console: "shell-session",
  terminal: "shell-session",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  node: "javascript",
  ts: "typescript",
  md: "markdown",
  jsonc: "json",
  json5: "json",
  dockerfile: "docker",
  make: "makefile",
  mk: "makefile",
  patch: "diff",
  gitdiff: "diff",
  curl: "http",
  rest: "http",
  dotenv: "ini",
  env: "ini",
  cfg: "ini",
  conf: "nginx"
}

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

  /**
   * Highlight one fenced block. The fence names its language in a
   * class, in whatever spelling the writer used, so the name is
   * lower-cased and put through the alias table before a grammar is
   * looked up; no grammar means the block stays as the writer wrote
   * it, which is better than highlighting it as the wrong thing.
   */
  function highlight(code) {
    const match = /\blang(?:uage)?-([\w-]+)/i.exec(code.className || "")
    const name = match && match[1].toLowerCase()
    const lang = name && (aliases[name] || name)
    const grammar = lang && Prism.languages[lang]
    if (grammar) {
      code.className = `language-${lang}`
      code.innerHTML = Prism.highlight(code.textContent, grammar, lang)
    }
  }

  return self
}
