Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do
        # Init the session and destroy wathever is there.
        init_session(true)

        render "images/index"
    end

    post :upload, :map => "/upload", :provides => :json do
        {:image => save_temporary_image}.to_json
    end
end
