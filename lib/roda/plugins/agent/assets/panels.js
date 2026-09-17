/**
 * The panels in the bar.
 *
 * A panel is a label, a badge, and a card. The host
 * says what the card holds, one of four ways:
 *
 *   src           markup, put in the card as it came
 *                 duration, tone}, grouped by `group`
 *   src           markup, put in the card as it came
 *   content       markup on the <agent-panel> element
 *   render        a function that fills the body
 *
 * A child with slot="aside" goes in the label.
 *
 * Hover opens, one panel at a time, above its own
 * label. Leaving both closes it.
 */

/* Long enough to cross the gap between a label and
   the panel, short enough to feel immediate. */

/* A third of the console: wide enough for a line
   of what a panel holds, narrow enough to leave the
   page behind it. */
const MIN_WIDTH = 200

/* How far above the label the panel sits. */
const GAP = 6

export function panels({ root, host }) {
  const self = Object.create(null)
  const strip = root.querySelector(".ac-panels")
  const bar = root.querySelector(".ac-activity")
  const view = root.querySelector(".ac-panel-view")
  const title = view.querySelector(".ac-panel-title")
  const body = view.querySelector(".ac-panel-body")
  const note = view.querySelector(".ac-panel-note")
  let watching = false

  self.items = []
  self.open = null


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
/**
 * The label sits in the bar's disclosure: a click
 * reaching it would open the list too. Clicking is
 * for a pointer that cannot hover.
 */
      if (triggerOf(item.label) === "hover") {
        label.addEventListener("pointerenter", () => { if (!self.open) self.show(item.label) })
      }

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
    el.textContent = "|"
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
    if (self.open !== label) {
      self.open = label
      self.refresh()
      host.setAttribute("panel", label)
      title.textContent = label
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
    let markup
    try {
      markup = await item.load()
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
 * HTML, and the page's own styling with it. A panel
 * is supported by an endpoint that answers with HTML,
 * the same way a page is.
 */
    body.innerHTML = markup || ""
  }

  self.close = () => {
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
  /**
   * A panel may ask to be a sidebar: `data-side="right"` on the
   * <agent-panel> that declares it. Then it takes the console's own box,
   * to its right, at its full height, instead of a card above the bar.
   */
  /**
   * `trigger="hover"` on an <agent-panel> opens it on the pointer instead
   * of on a click. Absent, a panel opens when it is clicked.
   */
  function triggerOf(label) {
    const panels = host.querySelectorAll("agent-panel[trigger]")
    for (const each of panels) {
      if (each.getAttribute("label") === label) return each.getAttribute("trigger")
    }
    return null
  }

  function sideOf(label) {
    const panels = host.querySelectorAll("agent-panel[data-side]")
    for (const each of panels) {
      if (each.getAttribute("label") === label) return each.dataset.side
    }
    return null
  }

  function place(label) {
    if (sideOf(label) === "right") {
      /* A pane in the console's frame: its geometry is CSS's, not ours. */
      view.classList.add("is-side")
      view.style.top = view.style.left = view.style.width = view.style.height = view.style.bottom = ""
      return
    }
    view.classList.remove("is-side")
    const outer = host.getBoundingClientRect()
    const anchor = labelFor(label) || bar
    const box = anchor.getBoundingClientRect()
    const frame = bar.getBoundingClientRect()
    const width = Math.min(Math.max(Math.round(frame.width / 3), MIN_WIDTH), Math.round(frame.width))
    const left = Math.min(
      Math.max(8, Math.round(box.left - outer.left)),
      Math.max(8, Math.round(outer.width - width - 8))
    )
    view.style.left = `${left}px`
    view.style.width = `${width}px`
    view.style.top = "auto"
    view.style.bottom = `${Math.round(outer.bottom - box.top + GAP)}px`
  }



  /**
   * A card is closed by its own control, by a press somewhere else, or by
   * Escape. The pointer is not consulted: a card that changes height moves
   * under a pointer that did not, and a panel that disappears while it is
   * being read is worse than one left open.
   */
  function watch() {
    if (watching) return
    watching = true
    document.addEventListener("pointerdown", (event) => {
      if (!self.open) return
      const path = event.composedPath()
      /* The panel is part of the console now: a press anywhere in it,
         the composer included, is not a press outside it. */
      if (!path.includes(view) && !path.includes(strip) && !path.includes(host)) self.close()

    }, true)
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") self.close()
    })
    const close = view.querySelector(".ac-panel-close")
    if (close) close.addEventListener("click", () => self.close())
  }

  /* The console is measured, not remembered: whatever moves it, the card
     that sits against it moves too. */
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(() => { if (self.open) place(self.open) }).observe(host)
  }
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => { if (self.open) place(self.open) })
  }

  let linger = null

  /* Hover-open closes on the way out, after a grace long enough to cross
     the gap between the label and the panel. */
  function lingerOff() {
    if (linger) clearTimeout(linger)
    linger = null
  }

  function lingerOn() {
    lingerOff()
    linger = setTimeout(() => {
      linger = null
      self.close()
    }, 240)
  }

  function open_() {
    watch()
    view.classList.add("is-open")
  }

  function close_() {
    view.classList.remove("is-open")
  }


  /**
   * While a turn is in flight, an open panel follows it. The console keeps
   * `busy` on the host for the duration, so this is idle the rest of the
   * time - no polling at rest, and nothing to unsubscribe.
   */
  if (typeof host !== "undefined" && typeof setInterval === "function") {
    let wasBusy = false
    const pull = () => {
      if (!self.open) return
      const label = self.open
      self.open = null
      self.show(label)
    }
    setInterval(() => {
      const busy = host.hasAttribute("busy")
      /* While it runs, and once more when it stops: the answer and the save
         that follows it land just after `busy` clears. */
      if (busy || wasBusy) pull()
      wasBusy = busy
    }, 1200)
  }

  return self
}
