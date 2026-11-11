module ApplicationHelper
  def nav_link_classes(active)
    base = "px-3 py-1.5 rounded-full font-label-md text-label-md transition-all"

    if active
      "#{base} bg-primary text-on-primary shadow-sm"
    else
      "#{base} text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
    end
  end
end
