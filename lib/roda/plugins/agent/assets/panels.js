/**
 * The panels in the bar, ahead of Memory.
 *
 * A panel is a label, an optional badge, and a list of rows behind it. The
 * console draws all of that. The host says what belongs in the list, either
 * with `src` on an <agent-panel> child or with a `load` function on
 * `agentConsole.panels`.
 *
 * A label is the same kind of thing Memory's label is, and its panel opens
 * above the label rather than above the console, so a panel appears where
 * the pointer asked for it.
 *
 * Hover is the trigger: pointing at a label opens its panel and fetches it,
 * and the panel
 * goes away when the pointer is on neither the label nor the panel. That is
 * judged from the pointer's own path, because a pointer can leave a label in
 * ways a leave event does not describe.
 */

const ICONS = {
  dot: "M12 12h.01",
  chevron: "M6 9l6 6 6-6",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  person: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  speech: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  tool: "M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3zM6 3l3 3M3 6l3 3",
  return: "M9 14l-4-4 4-4M5 10h9a5 5 0 0 1 0 10h-2",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  warn: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
}

/* Long enough for the pointer to cross from a label to the panel, short
   enough that leaving does not feel like nothing happened. */
const GRACE = 140

/* A third of the console is the ask; this is where a row stops reading. */
const MIN_WIDTH = 200

/* How far above the label the panel sits. */
const GAP = 6

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
  const bar = root.querySelector(".ac-activity")
  const view = root.querySelector(".ac-panel-view")
  const title = view.querySelector(".ac-panel-title")
  const body = view.querySelector(".ac-panel-body")
  const note = view.querySelector(".ac-panel-note")
  let grace = null
  let watching = false

  self.items = []
  self.open = null

  const supported = () => typeof view.showPopover === "function"

  /**
   * What the host declared, drawn as labels separated by rules, like the
   * rule Memory puts between its own label and its meter.
   */
  self.set = (items) => {
    self.items = items || []
    strip.innerHTML = ""
    self.items.forEach((item, index) => {
      if (index) strip.append(divider())
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
      label.addEventListener("pointerenter", () => self.show(item.label))
      label.addEventListener("pointerleave", self.soon)
      label.addEventListener("focus", () => self.show(item.label))
      label.addEventListener("blur", self.soon)
      /**
       * The labels sit inside the activity summary, which is a disclosure: a
       * click that reached it would open the list as well. Clicking is for a
       * pointer that cannot hover.
       */
      label.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        self.toggle(item.label)
      })
      /**
       * A panel may bring something of its own into the label: Memory's
       * meter sits there, and the label around it is the same label every
       * panel has.
       */
      if (item.aside) label.append(...(Array.isArray(item.aside) ? item.aside : [item.aside]))
      strip.append(label)
    })
    if (self.open && !self.items.some((item) => item.label === self.open))
      self.close()
  }

  function divider() {
    const el = document.createElement("span")
    el.className = "ac-panel-divider"
    el.setAttribute("part", "panel-divider")
    el.setAttribute("aria-hidden", "true")
    return el
  }

  function labelFor(name) {
    return strip.querySelector(`.ac-panel[data-panel="${name}"]`)
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
    self.hold()
    if (self.open !== label) {
      self.open = label
      self.refresh()
      host.setAttribute("panel", label)
      title.textContent = label
      body.innerHTML = ""
      note.hidden = true
    }
    place(label)
    open_()
    /**
     * Fetched on every open, not once. A trace grows while the conversation
     * goes on, and a panel that showed an empty list before a turn should not
     * keep showing it after one. What was fetched last time stays on screen
     * while this fetch is in flight, so reopening does not flicker.
     */
    /**
     * A panel says what it holds in one of two ways: rows, which it fetches,
     * or a `render` that fills the body itself. Memory's card is the second:
     * a sentence and a number, with no rows in it.
     */
    if (item.render) {
      note.hidden = true
      body.innerHTML = ""
      item.render(body)
      return
    }
    /**
     * A panel that brought markup shows that instead of rows. The nodes are
     * moved rather than copied, so the page keeps the elements it wrote and
     * can go on updating them.
     */
    if (item.content) {
      note.hidden = true
      body.innerHTML = ""
      for (const node of item.content) body.append(node)
      return
    }
    if (!body.childNodes.length) {
      note.textContent = "Loading…"
      note.hidden = false
    }
    try {
      item.rows = await item.load()
    } catch (error) {
      if (!body.childNodes.length) {
        note.textContent = "That could not be loaded."
        note.hidden = false
      }
      return
    }
    if (self.open !== label) return
    note.hidden = true
    /**
     * Markup from the route goes in as it came. It is the page's own HTML,
     * rendered by the page's own views, and it carries whatever styling it
     * needs: inside the shadow root the page's stylesheet does not reach,
     * though its custom properties do.
     */
    if (item.html) {
      body.innerHTML = item.rows || ""
      return
    }
    self.draw(item.rows)
  }

  self.close = () => {
    self.hold()
    if (!self.open) return
    self.open = null
    self.refresh()
    host.removeAttribute("panel")
    close_()
    body.innerHTML = ""
  }

  /**
   * Above the label rather than above the console, so it appears where the
   * pointer is. A third of the bar's width, kept inside the window.
   */
  function place(label) {
    const anchor = labelFor(label) || bar
    const box = anchor.getBoundingClientRect()
    const frame = bar.getBoundingClientRect()
    const width = Math.min(Math.max(Math.round(frame.width / 3), MIN_WIDTH), Math.round(frame.width))
    const left = Math.min(
      Math.max(8, Math.round(box.left)),
      Math.max(8, window.innerWidth - width - 8)
    )
    view.style.left = `${left}px`
    view.style.width = `${width}px`
    view.style.top = "auto"
    view.style.bottom = `${Math.round(window.innerHeight - box.top + GAP)}px`
  }

  self.hold = () => {
    if (grace) clearTimeout(grace)
    grace = null
  }

  self.soon = () => {
    self.hold()
    grace = setTimeout(() => self.close(), GRACE)
  }

  /**
   * The panel is open while the pointer is on the label or on the panel.
   * Judged from the path the pointer is travelling rather than from leave
   * events alone, so leaving always closes it and returning always reopens
   * it.
   */
  function watch() {
    if (watching) return
    watching = true
    document.addEventListener("pointermove", (event) => {
      if (!self.open) return
      const path = event.composedPath()
      if (path.includes(view) || path.includes(strip)) self.hold()
      else self.soon()
    }, true)
  }

  function open_() {
    watch()
    if (supported()) {
      if (!view.matches(":popover-open")) view.showPopover()
    } else {
      view.classList.add("is-open")
    }
  }

  function close_() {
    if (supported()) {
      if (view.matches(":popover-open")) view.hidePopover()
    }
    view.classList.remove("is-open")
  }

  view.addEventListener("pointerenter", self.hold)
  view.addEventListener("pointerleave", self.soon)

  /**
   * A row is a line of a panel: an icon, a title, a detail, and how long it
   * took. A panel that is not a list of rows is not supported yet.
   */
  /**
   * A row is a line of a panel: an icon, a title, a detail, and how long it
   * took. Rows that name a group are folded under it, one group open at a
   * time, and the newest open, since that is the one being asked about.
   *
   * A panel that is not a list of rows is not supported yet.
   */
  self.draw = (rows) => {
    body.innerHTML = ""
    for (const group of group_(rows || [])) {
      const els = group.rows.map(row_)
      if (!group.name) {
        els.forEach((el) => body.append(el))
        continue
      }
      const details = document.createElement("details")
      details.className = "ac-panel-group"
      details.setAttribute("part", "panel-group")
      details.open = group.last
      const summary = document.createElement("summary")
      summary.className = "ac-panel-group-summary"
      summary.setAttribute("part", "panel-group-summary")
      summary.append(svg("chevron"))
      const name = document.createElement("span")
      name.textContent = group.name
      summary.append(name)
      const count = document.createElement("span")
      count.className = "ac-panel-group-count"
      count.textContent = `${group.rows.length}`
      summary.append(count)
      details.append(summary)
      els.forEach((el) => details.append(el))
      /* One at a time: opening a turn closes the others. */
      details.addEventListener("toggle", () => {
        if (!details.open) return
        for (const other of body.querySelectorAll(".ac-panel-group[open]")) {
          if (other !== details) other.open = false
        }
      })
      body.append(details)
    }
    if (!body.childNodes.length) {
      note.textContent = "Nothing here yet."
      note.hidden = false
    }
  }

  /**
   * The rows split where the group name changes. The events arrive in the
   * order they happened, so a group is a run of them and nothing has to be
   * sorted.
   */
  function group_(rows) {
    const groups = []
    for (const row of rows) {
      const name = row.group || ""
      let group = groups[groups.length - 1]
      if (!group || group.name !== name) {
        group = {name, rows: []}
        groups.push(group)
      }
      group.rows.push(row)
    }
    if (groups.length) groups[groups.length - 1].last = true
    return groups
  }

  function row_(row) {
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
    return el
  }

  return self
}
