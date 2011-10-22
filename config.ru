require 'lib/whocares.rb'

map('/static') { run Rack::Directory.new 'static' }
map('/') { run Sinatra::Application }
