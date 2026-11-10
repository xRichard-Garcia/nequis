require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "renders the landing page" do
    get root_path

    assert_response :success
    assert_select "html[lang=?]", "es"
    assert_select "h1", text: /Transformamos tus recuerdos/
    assert_select "section#inicio"
    assert_select "section#catalogo"
    assert_select "footer#contacto"
  end
end
