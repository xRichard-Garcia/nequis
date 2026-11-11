import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]

  select(event) {
    this.activate(event.currentTarget)
  }

  navigate(event) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return

    event.preventDefault()

    const currentIndex = this.tabTargets.indexOf(event.currentTarget)
    let nextIndex

    if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = this.tabTargets.length - 1
    } else {
      const direction = event.key === "ArrowRight" ? 1 : -1
      nextIndex = (currentIndex + direction + this.tabTargets.length) % this.tabTargets.length
    }

    this.activate(this.tabTargets[nextIndex], { focus: true })
  }

  activate(tab, { focus = false } = {}) {
    const key = tab.dataset.key

    this.tabTargets.forEach((item) => {
      const isActive = item === tab

      item.classList.toggle("bg-primary", isActive)
      item.classList.toggle("text-on-primary", isActive)
      item.classList.toggle("text-on-surface-variant", !isActive)
      item.classList.toggle("hover:text-on-surface", !isActive)
      item.setAttribute("aria-selected", String(isActive))
      item.tabIndex = isActive ? 0 : -1
    })

    this.panelTargets.forEach((panel) => {
      const isActive = panel.dataset.key === key

      panel.classList.toggle("hidden", !isActive)
      panel.classList.toggle("flex", isActive)
    })

    if (focus) tab.focus()
  }
}
