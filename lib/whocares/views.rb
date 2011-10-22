require 'mustache'

module WhoCares::Views
  class Layout < Mustache
    JS = Struct.new :path

    def self.javascript js
      @@javascripts ||= []
      @@javascripts << JS.new("/#{js.to_s}.js")
    end
  end

  class Index < Layout
    [:jquery, :underscore].each { |js| javascript js }

    def title
      'Who Cares?'
    end

    def javascripts
      @@javascripts
    end
  end
end
