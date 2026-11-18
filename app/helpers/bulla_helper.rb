module BullaHelper
  def bulla_active_path
    case action_name
    when "index" then "/"
    when "about" then "/nosotros"
    when "team" then "/equipo"
    when "services", "service" then "/servicios"
    when "portfolio", "project" then "/portafolio"
    when "blog", "article" then "/oportunidad"
    when "contact", "thanks" then "/contacto"
    else ""
    end
  end

  def bulla_nav_items
    routes = {
      "/" => bulla_path,
      "/nosotros" => bulla_about_path,
      "/equipo" => bulla_team_path,
      "/servicios" => bulla_services_path,
      "/portafolio" => bulla_portfolio_path,
      "/oportunidad" => bulla_blog_path,
      "/contacto" => bulla_contact_path
    }

    BullaContent::NAV_ITEMS.map do |label, path|
      [ label, routes.fetch(path), bulla_active_path == path ]
    end
  end
end
