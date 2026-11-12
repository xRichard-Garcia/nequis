import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["cartCount", "status"]

  addToCart(event) {
    event.preventDefault()

    const button = event.currentTarget
    if (button.dataset.added === "true") return

    const isCompact = button.dataset.compact === "true"
    const productName = button.closest(".group")?.querySelector("h3")?.textContent.trim()
    const originalContent = button.innerHTML

    button.dataset.added = "true"

    if (isCompact) {
      button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>'
      button.classList.replace("bg-brand-dark", "bg-brand-purple")
    } else {
      button.innerHTML = '<span class="material-symbols-outlined text-[18px]" aria-hidden="true">check</span><span>¡Añadido!</span>'
      button.classList.add("bg-secondary", "text-on-secondary")
    }

    this.incrementCart()
    if (this.hasStatusTarget) {
      this.statusTarget.textContent = productName ? `${productName} añadido al carrito` : "Producto añadido al carrito"
    }

    setTimeout(() => {
      button.innerHTML = originalContent

      if (isCompact) {
        button.classList.replace("bg-brand-purple", "bg-brand-dark")
      } else {
        button.classList.remove("bg-secondary", "text-on-secondary")
      }

      delete button.dataset.added
    }, 1500)
  }

  toggleFavorite(event) {
    event.preventDefault()

    const button = event.currentTarget
    const icon = button.querySelector(".material-symbols-outlined")
    const isFavorite = button.dataset.favorite === "true"

    button.dataset.favorite = String(!isFavorite)
    button.setAttribute("aria-pressed", String(!isFavorite))
    button.style.color = isFavorite ? "" : "var(--color-error)"

    const productName = button.closest(".group")?.querySelector("h3")?.textContent.trim()
    if (productName) {
      const action = isFavorite ? "Añadir" : "Quitar"
      button.setAttribute("aria-label", `${action} ${productName} ${isFavorite ? "a" : "de"} favoritos`)
    }

    if (icon) {
      icon.style.fontVariationSettings = isFavorite ? "" : "'FILL' 1"
    }
  }

  incrementCart() {
    if (!this.hasCartCountTarget) return

    const count = Number.parseInt(this.cartCountTarget.textContent, 10) || 0
    this.cartCountTarget.textContent = count + 1
  }
}
