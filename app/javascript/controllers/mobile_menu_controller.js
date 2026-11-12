import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "button", "openIcon", "closeIcon"]

  connect() {
    this.isOpen = false
    this.onKeydown = this.handleKeydown.bind(this)
    this.onResize = this.handleResize.bind(this)
    document.addEventListener("keydown", this.onKeydown)
    window.addEventListener("resize", this.onResize)
    this.close()
  }

  disconnect() {
    document.removeEventListener("keydown", this.onKeydown)
    window.removeEventListener("resize", this.onResize)
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.isOpen = true
    this.panelTarget.classList.remove("hidden")
    this.buttonTarget.setAttribute("aria-expanded", "true")
    this.buttonTarget.setAttribute("aria-label", "Cerrar menú de navegación")
    this.openIconTarget.classList.add("hidden")
    this.closeIconTarget.classList.remove("hidden")
  }

  close() {
    this.isOpen = false
    this.panelTarget.classList.add("hidden")
    this.buttonTarget.setAttribute("aria-expanded", "false")
    this.buttonTarget.setAttribute("aria-label", "Abrir menú de navegación")
    this.openIconTarget.classList.remove("hidden")
    this.closeIconTarget.classList.add("hidden")
  }

  closeOnOutsideClick(event) {
    if (this.isOpen && !this.element.contains(event.target)) this.close()
  }

  handleKeydown(event) {
    if (event.key === "Escape" && this.isOpen) {
      this.close()
      this.buttonTarget.focus()
    }
  }

  handleResize() {
    if (window.matchMedia("(min-width: 1024px)").matches) this.close()
  }
}
