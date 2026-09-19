/**
 * The panels in the bar.
 *
 * A panel is a label, a badge, and a card. The host says
 * what the card holds, one of three ways:
 *
 *   src       HTML from a route, put in the card as it came
 *   content   markup on the <agent-panel> element
 *   render    a function that fills the body
 *
 * A child with slot="aside" goes in the label. Hover opens
 * one panel at a time, above its own label; leaving both
 * closes it.
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

    /* A panel with the 'open' attribute set is
       queued to be opened in this function */
    queueMicrotask(() => {
      const open = self.items.find((item) => item.open)
      if (open && !self.open)
        self.show(open.label)
    })

    /* Empty before filling. A set replaces the labels rather
       than adding to them. */
    strip.innerHTML = ""

    self.items.forEach((item, index) => {
      if (index)
        strip.append(divider())
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
     * reaching it would open the list too. Clicking is for
     * a pointer that cannot hover.
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
      if (item.aside)
        label.append(...(Array.isArray(item.aside) ? item.aside : [item.aside]))
      strip.append(label)
    })

    if (self.open && !self.items.some((item) => item.label === self.open))
      self.close()
  }

  /** Two disclosures that a name opens one at a time. */
  function sameGroup(one, other) {
    const name = one.getAttribute("name")
    return name !== null && name === other.getAttribute("name")
  }

  function labelOf(details) {

    const summary = details.querySelector("summary")
    return (summary || details).textContent.replace(/\s+/g, " ").trim()
  }

  /**
   * An open disclosure, described well enough to put back: the name it
   * groups by, where it sat among those grouping the same way, and the
   * text of its summary.
   */
  function describe(details, all) {
    const name = details.getAttribute("name")
    const same = all.filter((each) => each.getAttribute("name") === name)
    return {
      name,
      key: details.dataset.key || null,
      at: same.indexOf(details),
      of: same.length,
      label: labelOf(details)
    }
  }

  function spinner() {
    const el = document.createElement("div")
    el.className = "ac-panel-spin"
    el.setAttribute("part", "panel-spin")
    el.setAttribute("role", "status")
    el.setAttribute("aria-label", "Loading")
    el.append(document.createElement("span"))
    return el
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
   * Keeps the labels in step with the open panel, without
   * rebuilding them.
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

  self.show = async (label, options = {}) => {
    /* quiet: a refresh of a panel already open, not an open. */
    const quiet = options.quiet === true
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
   * Open the panel marked `focus-on-turn-start` when a turn
   * starts. The console does not know what the host calls
   * its trace, so the markup says which panel it means.
   */
  self.follow = () => {
    const item = self.items.find((each) => each.follow)
    if (item && self.open !== item.label)
      self.show(item.label)
  }

  /**
   * Fetched on every open: what a panel holds grows while
   * the conversation does. What was fetched last time stays
   * on screen while the next fetch is in flight, so
   * reopening does not flicker.
   */
    if (item.render) {
      note.hidden = true
      body.innerHTML = ""
      item.render(body)
      return
    }

  /**
   * Markup the panel brought. The nodes are moved, not
   * copied, so the page keeps its elements.
   */
    if (item.content) {
      note.hidden = true
      body.innerHTML = ""
      for (const node of item.content) body.append(node)
      return
    }
    /** What the reader has open, as it stands. */
    const capture = () => {
      const all = [...body.querySelectorAll("details")]
      return {
        keys: new Set(all.map((details) => details.dataset.key).filter(Boolean)),
        opened: all.filter((details) => details.open)
                   .map((details) => describe(details, all))
      }
    }

    /* Read before anything is cleared: clearing first, for the spinner,
       threw away where the reader was on every open that showed one. */
    let { keys: before, opened } = capture()

    /* One request at a time per panel. A refresh arriving while one is on
       the wire is remembered rather than queued: when that one settles, the
       wanted one goes out. An open the reader asked for never waits, and
       neither does any refresh once the pass in flight has been gone longer
       than a request plausibly would. */
    if (quiet && busy) {
      wanted = true
      if (Date.now() - busySince < ABANDON_MS) return
    }
    const mine = ++issued

    if (!quiet) {
      note.hidden = true
      body.innerHTML = ""
      body.append(spinner())
    }

    let markup = null
    let failed = false
    busy = true
    busySince = Date.now()
    try {
      markup = await item.load()
    } catch (error) {
      failed = true
    }
    /* Settled, whatever happened: from here the panel is free for the next
       pass, and one that came in meanwhile is taken now rather than lost. */
    busy = false
    if (wanted) {
      wanted = false
      self.show(label, { quiet: true })
    }

    if (failed) {
      /* A refresh that fails says nothing: what is on screen is still the
         last thing that was true, and a passing failure should not put an
         error over it. An open the reader asked for does say so. */
      if (!quiet) {
        body.innerHTML = ""
        note.textContent = "That could not be loaded."
        note.hidden = false
      }
      return
    }
    if (self.open !== label) return
    /* A newer pass has already landed, so this one is stale and leaves the
       body to it. */
    if (mine < newest) return
    newest = mine
    note.hidden = true

    /* Read again at the last moment. Under a quiet refresh the body was
       never cleared, so this is what the reader has open *now* - including
       anything they opened while this pass was on the wire. */
    if (quiet) ({ keys: before, opened } = capture())

    /* Where the reader was scrolled, so replacing the markup does not send
       them back to the top. */
    const wasAt = body.scrollTop
    body.innerHTML = markup || ""
    const fresh = [...body.querySelectorAll("details")]

    /* The markup opens one disclosure of each group itself. If that one was
       not in the tree a moment ago it has just arrived - a span that has
       begun - and its group belongs to it: it opens, the rest of its group
       fold, and what the reader had open in that group is not put back. A
       turn taking the panel is what that is for. */
    const taken = new Set()
    for (const details of fresh) {
      const key = details.dataset.key
      if (!details.hasAttribute("open") || !key || before.has(key)) continue
      taken.add(details.getAttribute("name"))
      details.open = true
      for (const other of fresh) if (other !== details && sameGroup(other, details)) other.open = false
    }

    for (const want of opened) {
      if (taken.has(want.name)) continue
      const same = fresh.filter((details) => details.getAttribute("name") === want.name)
      /* What identifies it, best first: the key the markup gave it, which
         survives its counts changing; then the same place in a group of the
         same size; then the same summary. */
      /* From the end: rows arrive at the top while a turn runs, so a row
         that was third from the bottom still is, though its position from
         the top and the group's size have both moved. */
      const fromEnd = same.length > want.of ? same[same.length - (want.of - want.at)] : null
      const found = (want.key !== null ? fresh.find((details) => details.dataset.key === want.key) : null)
        || (same.length === want.of ? same[want.at] : null)
        || fromEnd
        || same.find((details) => labelOf(details) === want.label)
      if (!found) continue
      /* A name opens one at a time, so the rest of the group it is in now
         go before it does - its own group, which is not necessarily the one
         it was in before, a span having moved a place. */
      for (const other of fresh) if (other !== found && sameGroup(other, found)) other.open = false
      found.open = true
    }
    body.scrollTop = wasAt
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
   * `trigger="hover"` on an <agent-panel> opens it on the
   * pointer instead of on a click. Absent, a panel opens
   * when it is clicked.
   */
  function triggerOf(label) {
    const panels = host.querySelectorAll("agent-panel[trigger]")
    for (const each of panels) {
      if (each.getAttribute("label") === label) return each.getAttribute("trigger")
    }
    return null
  }

  function sideOf(label) {
    const panels = host.querySelectorAll("agent-panel[appears-on]")
    for (const each of panels) {
      if (each.getAttribute("label") === label) return each.getAttribute("appears-on")
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
   * A card is closed by its own control, by a press
   * somewhere else, or by Escape. The pointer is not
   * consulted: a card that changes height moves under a
   * pointer that did not, and a panel that disappears while
   * it is being read is worse than one left open.
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
      if (event.key !== "Escape") return
      /* An open dialog is the reader's, not the panel's: its Escape is the
         browser's and arrives here like any other keydown. */
      if (root.querySelector("dialog[open]")) return
      self.close()
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

  /* Passes issued, and the newest one that has written the body. A pass is
     stale only if a newer one has already landed - not merely started,
     which under a slow route would mean no pass ever landed at all. */
  let issued = 0
  let newest = 0

  /* Whether a request is on the wire for this panel, and whether a refresh
     came in while it was. Both are cleared as the pass settles, whether it
     succeeded, failed or never answered, so a bad fetch cannot leave the
     panel waiting on it forever. */
  let busy = false
  let wanted = false
  let busySince = 0

  /* How long a pass may be gone before the next one stops waiting for it. A
     request that never answers would otherwise freeze the panel until the
     page was reloaded. */
  const ABANDON_MS = 20000

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
   * While a turn is in flight, an open panel follows it.
   * The console keeps `busy` on the host for the duration,
   * so this is idle the rest of the time - no polling at
   * rest, and nothing to unsubscribe.
   */
  if (typeof host !== "undefined" && typeof setInterval === "function") {
    let wasBusy = false
    const pull = () => {
      if (!self.open) return
      const label = self.open
      self.open = null
      self.show(label, { quiet: true })
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
