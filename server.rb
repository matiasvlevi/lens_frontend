require 'sinatra'
require "sinatra/cors"
require "lens_protocol"

set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

get '/' do
  content_type 'text/html'
  files_and_messages = Dir['oma/*.oma'].map do |file|
    [File.basename(file), LensProtocol::OMA.parse(File.read(file))]
  end

  erb :index, locals: {files_and_messages: files_and_messages}
end

get '/download/svg/:name.svg' do
  content_type 'data:text/plain'

  name = params['name'];

  file = LensProtocol::OMA.parse(File.read("./oma/#{name}.oma"))

  file.to_svg()[params[:id].to_i]
end

get '/delete' do
    File.delete("oma/#{params[:file]}")
end

get '/upload' do
  erb :upload
end

post '/upload' do

  headers 'Access-Control-Allow-Origin' => '*'
  content_type 'text/plain'

  file = request.body.read
  
  File.write("./oma/#{params[:file]}", file);
  render "index"

  'ok'
end