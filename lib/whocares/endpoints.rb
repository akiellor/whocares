require 'sinatra'

require 'mustache/sinatra'
require 'sinatra/jsonp'

get '/' do
  mustache :index
end

get '/people' do
  JSONP {}
end

get '/projects' do
  JSONP {}
end
