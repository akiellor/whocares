require './endpoints'

map('/static') { run Rack::Directory.new 'static' }
map('/') { run Sinatra::Application }
