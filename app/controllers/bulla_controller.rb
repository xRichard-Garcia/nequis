class BullaController < ApplicationController
  layout "bulla"

  def index; end

  def about; end

  def team; end

  def services; end

  def service
    @service = BullaContent::SERVICES.find { |service| service[:id] == params[:id] }
    render_not_found unless @service
  end

  def portfolio; end

  def project
    @project = BullaContent::PROJECTS.find { |project| project[:id] == params[:id] }
    render_not_found unless @project
  end

  def blog; end

  def article
    @article = BullaContent::ARTICLES.find { |article| article[:id] == params[:id] }
    render_not_found unless @article
  end

  def investment; end

  def contact
    @requested_service = BullaContent::SERVICES.find { |service| service[:id] == params[:servicio] }
  end

  def thanks; end

  def faq; end

  def legal
    @legal_page = BullaContent::LEGAL_PAGES[params[:key].to_sym]
    render_not_found unless @legal_page
  end

  def not_found
    render_not_found
  end

  private

  def render_not_found
    render :not_found, status: :not_found
  end
end
