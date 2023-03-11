require 'sinatra'
require "sinatra/cors"
require "lens_protocol"

set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"
set :bind, '0.0.0.0'
set :port, 80
%x( start http://127.0.0.1:80 )

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

get '/download/oma/:name.oma' do
    content_type 'data:text/plain'
  
    name = params['name'];
  
    File.read("./oma/#{name}.oma")
  end

get '/delete' do
    File.delete("oma/#{params[:file]}")
end

get '/upload' do
  erb :upload
end

post '/upload' do
  if File.extname(params[:file]) == ".oma" then
    headers 'Access-Control-Allow-Origin' => '*'
    content_type 'text/plain'
  
    file = request.body.read
    
    File.write("./oma/#{params[:file]}", file);
    render "index"
  
    'ok'
  end
end