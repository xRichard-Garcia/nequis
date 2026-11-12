# NEQUIS Sublimación

Landing page y página institucional de **NEQUIS Sublimación**, recreadas en Rails
a partir de los diseños "Inicio - NEQUIS (Diseño Estilo Oasis Editorial)" y
"Sobre NEQUIS - Las Creadoras (Estilo Oasis Editorial)" de Stitch. Usa Rails 8,
Tailwind CSS v4 e importmap (sin build de JavaScript).

## Requisitos

- Ruby 3.3.7
- SQLite 3

## Puesta en marcha

```bash
bin/setup
bin/dev
```

`bin/dev` levanta el servidor y el watcher de Tailwind (definidos en
`Procfile.dev`). La página queda disponible en <http://localhost:3000>.

Para compilar el CSS una sola vez:

```bash
bin/rails tailwindcss:build
```

## Pruebas y estilo

```bash
bin/rails test
bin/rubocop
```

## Assets de producción

```bash
RAILS_ENV=production SECRET_KEY_BASE_DUMMY=1 bin/rails assets:precompile
```

La tarea `assets:precompile` ejecuta `tailwindcss:build` automáticamente.

## Estructura principal

- `app/views/home/index.html.erb`: landing editorial completa.
- `app/views/home/about.html.erb`: historia y creadoras.
- `app/views/shared/_oasis_header.html.erb` y `_oasis_footer.html.erb`: navegación
  y pie de la landing.
- `app/views/shared/_oasis_about_header.html.erb` y `_oasis_about_footer.html.erb`:
  navegación y pie de la página institucional.
- `app/views/shared/`: header, footer y botón flotante de WhatsApp de respaldo.
- `app/views/home/_*.html.erb`: partials de beneficios, productos y galería.
- `app/assets/tailwind/application.css`: temas "Oasis Editorial" y "Pastel Whimsy"
  (colores, tipografías, espaciados y utilidades).
- `app/assets/images/nequis/`: imágenes locales del diseño.
- `app/javascript/controllers/shop_controller.js`: feedback de carrito y
  favoritos.
