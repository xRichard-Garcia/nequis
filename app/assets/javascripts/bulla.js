// Interacciones del sitio BULLA: menú móvil, filtros del portafolio y formulario prototipo.
(function () {
  function initMenu() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
  }

  function initFilters() {
    var buttons = document.querySelectorAll("[data-filter]");
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.dataset.filter;
        buttons.forEach(function (other) {
          var active = other === button;
          other.classList.toggle("active", active);
          other.setAttribute("aria-pressed", String(active));
        });

        document.querySelectorAll(".work-card").forEach(function (card) {
          card.classList.toggle("hidden", filter !== "Todos" && card.dataset.category !== filter);
        });
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var name = encodeURIComponent(form.elements.fullname.value.trim());
      window.location.href = form.dataset.thanksUrl + "?name=" + name;
    });
  }

  function init() {
    initMenu();
    initFilters();
    initContactForm();
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("turbo:load", init);
})();
