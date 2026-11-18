Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Landing y páginas institucionales.
  get "sobre-nosotros", to: "home#about", as: :about
  get "servicios", to: "home#services", as: :services
  get "opiniones", to: "home#opinions", as: :opinions

  # Sitio BULLA: layout y estilos propios. Es la página principal del sitio.
  get "bulla", to: "bulla#index", as: :bulla

  scope "bulla", as: :bulla do
    get "/", to: "bulla#index", as: :root
    get "nosotros", to: "bulla#about", as: :about
    get "equipo", to: "bulla#team", as: :team
    get "servicios", to: "bulla#services", as: :services
    get "servicio/:id", to: "bulla#service", as: :service
    get "portafolio", to: "bulla#portfolio", as: :portfolio
    get "proyecto/:id", to: "bulla#project", as: :project
    get "blog", to: "bulla#blog", as: :blog
    get "articulo/:id", to: "bulla#article", as: :article
    get "contacto", to: "bulla#contact", as: :contact
    get "gracias", to: "bulla#thanks", as: :thanks
    get "faq", to: "bulla#faq", as: :faq
    get "legal/:key", to: "bulla#legal", as: :legal
  end
  get "bulla/*path", to: "bulla#not_found"

  # Defines the root path route ("/")
  root "bulla#index"
end
