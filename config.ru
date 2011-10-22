$:.unshift File.expand_path('lib', File.dirname(__FILE__))

require 'whocares'

map('/static') { run Rack::Directory.new 'static' }
map('/') { run Sinatra::Application }
