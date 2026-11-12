import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item"]
  static values = {
    threshold: { type: Number, default: 0.15 },
    rootMargin: { type: String, default: "0px 0px -8% 0px" }
  }

  connect() {
    const targets = this.hasItemTarget ? this.itemTargets : []
    const revealElements = Array.from(this.element.querySelectorAll(".reveal"))

    this.items = Array.from(new Set([...targets, ...revealElements]))
    if (this.element.classList.contains("reveal")) this.items.unshift(this.element)

    if (this.items.length === 0) return

    if (this.prefersReducedMotion || !("IntersectionObserver" in window)) {
      this.items.forEach((item) => item.classList.add("is-visible"))
      return
    }

    this.items.forEach((item) => {
      const delay = item.dataset.revealDelay
      if (delay) item.style.setProperty("--reveal-delay", `${delay}ms`)
    })

    this.observer = new IntersectionObserver((entries) => this.reveal(entries), {
      threshold: this.thresholdValue,
      rootMargin: this.rootMarginValue
    })

    this.items.forEach((item) => this.observer.observe(item))
  }

  disconnect() {
    if (this.observer) this.observer.disconnect()
  }

  reveal(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      entry.target.classList.add("is-visible")
      this.observer.unobserve(entry.target)
    })
  }

  get prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }
}
