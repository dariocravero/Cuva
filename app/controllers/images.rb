Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do
        # Init the session and destroy wathever is there.
        init_session(true)

        @variable = "something cool " + Time.now.to_s

        render "images/index"
    end

    post :upload, :map => "/upload", :provides => :json do
        {:path => save_temporary_image, :width => :200, :height => :200}.to_json
    end

    post :rotate, :map => "/rotate", :provides => :json do
        puts params
        {:image => rotate_image(params[:image])}.to_json
    end
end
