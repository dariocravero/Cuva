Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do
        render "images/index"
    end

    post :upload, :map => "/" do
        @file = request.env['rack.input']
        @fileName = request.env['HTTP_X_FILE_NAME']
        puts @fileName
    end
end
