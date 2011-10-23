require 'mustache'

module WhoCares::Views
  class Layout < Mustache
    def self.javascript js
      @@javascripts ||= []
      @@javascripts << js
    end

    def javascripts
      @@javascripts
    end
  end

  class Index < Layout
    javascript :jquery
    javascript :p2p

    def title
      'Who Cares?'
    end
  end
end
