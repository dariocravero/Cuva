Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do
        render "images/index"
    end

    post :upload, :map => '/upload' do
          puts "uploaded #{env['HTTP_X_FILENAME']} - #{request.body.read.size} bytes"
    end
end
