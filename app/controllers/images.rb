Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do
        # Init the session and destroy wathever is there.
        init_session(true)

        render "images/index"
    end

    post :upload, :map => "/upload", :provides => :json do
        {:path => save_temporary_image, :width => 200, :height => 200}.to_json
    end

    post :rotate, :map => "/rotate", :provides => :json do
        puts params
        {:path => rotate_image(params[:path])}.to_json
    end

    post :crop, :map => "/crop", :provides => :json do
        {:path => crop_image(params[:path], params[:x1].to_i, 
                             params[:x2].to_i, params[:y1].to_i, params[:y2].to_i)
        }.to_json
    end
end
