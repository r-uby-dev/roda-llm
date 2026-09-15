/**
 * The panels in the bar, beside Memory.
 *
 * A panel is a label, an optional badge, and a list of rows behind it. The
 * console draws all of that. The host says what belongs in the list, either
 * with `src` on an <agent-panel> child or with a `load` function on
 * `agentConsole.panels`.
 *
 * One panel is open at a time. Opening one is mirrored onto the host as a
 * `panel` attribute, the way `expanded` already works, so a page can react
 * without reaching into the shadow root.
 */

const ICONS = {
  dot: "M12 12h.01",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  person: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  speech: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  tool: "M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3zM6 3l3 3M3 6l3 3",
  return: "M9 14l-4-4 4-4M5 10h9a5 5 0 0 1 0 10h-2",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  warn: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
}

function svg(name) {
  const path = ICONS[name] || ICONS.dot
  const el = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  el.setAttribute("class", "ac-icon")
  el.setAttribute("viewBox", "0 0 24 24")
  el.setAttribute("fill", "none")
  el.setAttribute("stroke", "currentColor")
  el.setAttribute("stroke-width", "2")
  el.setAttribute("stroke-linecap", "round")
  el.setAttribute("stroke-linejoin", "round")
  el.setAttribute("aria-hidden", "true")
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
  p.setAttribute("d", path)
  el.append(p)
  return el
}

export function panels({ root, host }) {
  const self = Object.create(null)
  const strip = root.querySelector(".ac-panels")
  const view = root.querySelector(".ac-panel-view")
  const title = view.querySelector(".ac-panel-title")
  const body = view.querySelector(".ac-panel-body")
  const note = view.querySelector(".ac-panel-note")

  self.items = []
  self.open = null

  /**
   * What the host declared, drawn as labels in the bar.
   */
  self.set = (items) => {
    self.items = items || []
    strip.innerHTML = ""
    for (const item of self.items) {
      const label = document.createElement("button")
      label.type = "button"
      label.className = "ac-panel"
      label.dataset.panel = item.label
      label.setAttribute("part", "panel")
      label.setAttribute("aria-expanded", "false")
      const text = document.createElement("span")
      text.className = "ac-panel-label"
      text.textContent = item.label
      label.append(text)
      if (item.badge) {
        const badge = document.createElement("span")
        badge.className = "ac-panel-badge"
        badge.textContent = item.badge
        label.append(badge)
      }
      /**
       * The labels sit inside the activity summary, which is a disclosure:
       * a click that reached it would open the list as well.
       */
      label.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        self.toggle(item.label)
      })
      strip.append(label)
    }
    if (self.open && !self.items.some((item) => item.label === self.open))
      self.close()
  }

  /**
   * Keeps the strip's labels in step with the console's state without
   * rebuilding them, which is what a badge changing wants.
   */
  self.refresh = () => {
    for (const label of strip.querySelectorAll(".ac-panel")) {
      const open = label.dataset.panel === self.open
      label.classList.toggle("is-open", open)
      label.setAttribute("aria-expanded", open ? "true" : "false")
    }
  }

  self.toggle = (label) => {
    if (self.open === label) self.close()
    else self.show(label)
  }

  self.show = async (label) => {
    const item = self.items.find((each) => each.label === label)
    if (!item) return
    self.open = label
    self.refresh()
    host.setAttribute("panel", label)
    title.textContent = label
    body.innerHTML = ""
    note.textContent = ""
    note.hidden = true
    view.hidden = false
    if (!item.rows) {
      note.textContent = "Loading…"
      note.hidden = false
      try {
        item.rows = await item.load()
      } catch (error) {
        note.textContent = "That could not be loaded."
        return
      }
    }
    note.hidden = true
    self.draw(item.rows)
  }

  self.close = () => {
    self.open = null
    self.refresh()
    host.removeAttribute("panel")
    view.hidden = true
    body.innerHTML = ""
  }

  /**
   * A row is a line of a panel: an icon, a title, a detail, and how long it
   * took. A panel that is not a list of rows is not supported yet.
   */
  self.draw = (rows) => {
    body.innerHTML = ""
    for (const row of rows || []) {
      const el = document.createElement("div")
      el.className = "ac-panel-row"
      if (row.tone) el.classList.add(`is-${row.tone}`)
      el.setAttribute("part", "panel-row")
      el.append(svg(row.icon))
      const main = document.createElement("div")
      main.className = "ac-panel-row-main"
      const head = document.createElement("span")
      head.className = "ac-panel-row-title"
      head.textContent = row.title
      main.append(head)
      if (row.detail) {
        const detail = document.createElement("span")
        detail.className = "ac-panel-row-detail"
        detail.textContent = row.detail
        main.append(detail)
      }
      el.append(main)
      if (row.duration) {
        const duration = document.createElement("span")
        duration.className = "ac-panel-row-duration"
        duration.textContent = row.duration
        el.append(duration)
      }
      body.append(el)
    }
    if (!body.childNodes.length) {
      note.textContent = "Nothing here yet."
      note.hidden = false
    }
  }

  return self
}
