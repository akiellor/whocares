require 'mustache'

module Sinatra::Application::Views
  class Index < Mustache
    def content
      "I AM ALIVE"
    end
  end
end
