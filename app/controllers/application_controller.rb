class ApplicationController < ActionController::Base
  # El filtro `allow_browser versions: :modern` bloqueaba con 406 a móviles
  # con Safari < 17.2, Chrome < 120 o navegadores integrados (Instagram,
  # WhatsApp, etc.). La web debe poder verse en cualquier móvil.

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes
end
