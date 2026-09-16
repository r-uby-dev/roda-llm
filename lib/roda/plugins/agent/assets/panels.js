/**
 * The panels in the bar.
 *
 * A panel is a label, a badge, and a card. The host
 * says what the card holds, one of four ways:
 *
 *   src           rows: {icon, title, detail,
 *                 duration, tone}, grouped by `group`
 *   src + html    markup, put in the card as it came
 *   content       markup on the <agent-panel> element
 *   render        a function that fills the body
 *
 * A child with slot="aside" goes in the label.
 *
 * Hover opens, one panel at a time, above its own
 * label. Leaving both closes it.
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

/* Long enough to cross the gap between a label and
   the panel, short enough to feel immediate. */
const GRACE = 140

/* A third of the console; this is where a row
   stops reading. */
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
 * The host's labels, with a rule between them.
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
 * The label sits in the bar's disclosure: a click
 * reaching it would open the list too. Clicking is
 * for a pointer that cannot hover.
 */
      label.addEventListener("click", (event) => {
        event.preventDefault()
        event.stopPropagation()
        self.toggle(item.label)
      })
/**
 * A panel may bring something into the label: a
 * meter, a count, whatever it draws.
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
 * Keeps the labels in step with the open panel,
 * without rebuilding them.
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
      /* Placed once, where it opens. A card that re-anchored itself on
         every hover would follow the page as it scrolled under a resting
         pointer, which is not what a card does. */
      place(label)
      open_()
    }
/**
 * Fetched on every open: a trace grows while the
 * conversation does. What was fetched last time
 * stays on screen while the next fetch is in
 * flight, so reopening does not flicker.
 */
/**
 * What a panel holds arrives one of four ways, and
 * this is where three of them are told apart.
 */
    if (item.render) {
      note.hidden = true
      body.innerHTML = ""
      item.render(body)
      return
    }
/**
 * Markup the panel brought. The nodes are moved,
 * not copied, so the page keeps its elements.
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
 * Markup from the route, as it came: the page's own
 * HTML, and the page's own styling with it.
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
 * Above its own label, a third of the bar wide,
 * kept inside the window.
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
 * Open while the pointer is on the label or the
 * panel, judged from the pointer's path rather than
 * from leave events alone.
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
 * Rows, drawn: an icon, a title, a detail, and how
 * long it took. Rows that name a group are folded
 * under it, the newest open, one at a time.
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
/* Opening a turn closes the others. */
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
 * The rows split where the group name changes: the
 * events arrive in order, so a group is a run.
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
    if (row.icon) el.dataset.icon = row.icon
    el.setAttribute("part", "panel-row")

    const params = row.params || row.pairs || []
    const opens = !!(params.length || row.result)
    const details = document.createElement("details")
    details.className = "ac-panel-row-details"
    /* Nothing to open means nothing to close. */
    details.open = !opens

    /* The summary: a mark, what happened, and the control at the right
       edge that opens the rest. */
    const label = document.createElement("summary")
    label.className = "ac-panel-row-label"
    const what = document.createElement("span")
    what.className = "ac-panel-row-what"
    const head = document.createElement("span")
    head.className = "ac-panel-row-head"
    const kind = document.createElement("span")
    kind.className = "ac-panel-row-kind"
    kind.textContent = row.kind || ""
    if (row.running) kind.dataset.running = "true"
    head.append(kind)
    if (row.title) {
      const title = document.createElement("span")
      title.className = "ac-panel-row-title"
      title.textContent = row.title
      head.append(title)
    }
    what.append(head)
    /* The line under it: what the row was called, or what was said. */
    if (row.subject) {
      what.append(pair_(row.subject, "ac-panel-row-subject"))
    } else if (row.detail) {
      const detail = document.createElement("span")
      detail.className = "ac-panel-row-detail"
      detail.textContent = row.detail
      what.append(detail)
    }
    label.append(svg(row.icon), what)
    if (row.duration) {
      const duration = document.createElement("span")
      duration.className = "ac-panel-row-duration"
      duration.textContent = row.duration
      label.append(duration)
    }
    details.append(label)

    /* What the control opens: the parameters, and under a rule of its
       own, what the tool gave back. */
    if (opens) {
      const body = document.createElement("div")
      body.className = "ac-panel-row-body"
      for (const [field, value] of params) {
        if (!value) continue
        body.append(pair_([field, value], "ac-panel-row-pair"))
      }
      if (row.result && row.result[1]) {
        const result = pair_(row.result, "ac-panel-row-pair ac-panel-row-result")
        if (row.tone) result.classList.add(`is-${row.tone}`)
        body.append(result)
      }
      details.append(body)
    }
    el.append(details)
    return el
  }

  /**
   * One `key: value`, with the key and the value in their own columns.
   */
  function pair_([field, value], className) {
    const pair = document.createElement("span")
    pair.className = className
    const key = document.createElement("span")
    key.className = "ac-panel-row-key"
    key.textContent = field
    if (value) {
      const item = document.createElement("span")
      item.className = "ac-panel-row-value"
      item.textContent = value
      pair.append(key, item)
    }
    return pair
  }

  return self
}
