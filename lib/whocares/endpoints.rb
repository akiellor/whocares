require 'sinatra/base'

require 'mustache/sinatra'
require 'sinatra/jsonp'

class WhoCares < Sinatra::Base
  register Mustache::Sinatra
  helpers Sinatra::Jsonp

  get '/' do
    mustache :index
  end

  get '/people' do
    JSONP {}
  end

  get '/projects' do
    JSONP {}
  end
end
