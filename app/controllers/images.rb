Cuva.controllers :images do
    set :haml, :format => :html5

    before do
        @oauth_url = MiniFB.oauth_url('147129178669101', # your Facebook App ID (NOT API_KEY)
            "http://cuva.starlight.ie/facebook_connect", # redirect url
            :scope=>'publish_stream') # This asks for all permissions
    end


    get :index, :map => "/" do
        # Init the session and destroy wathever is there.
        init_session(true)

        render "images/index"
    end

    post :upload, :map => "/upload", :provides => :json do
        {:path => save_temporary_image, :width => 200, :height => 200}.to_json
    end

    post :rotate, :map => "/rotate", :provides => :json do
        {:path => rotate_image(params[:image][:path])}.to_json
    end

    post :crop, :map => "/crop", :provides => :json do
        {:path => crop_image(params[:image][:path],
                              params[:image][:x1], params[:image][:x2],
                              params[:image][:y1], params[:image][:y2])
        }.to_json
    end

    get :publish, :map => "/publish" do
    
    end

    get :facebook_connect, :map => "/facebook_connect" do
        access_token_hash = MiniFB.oauth_access_token('147129178669101', "http://cuva.starlight.ie/facebook_connect", 'e2194b5d9a9ff7ee6c648666b02c4ca2', params[:code])
        @access_token = access_token_hash["access_token"]
        session[:access_token] = @access_token
        
        redirect '/'
    end

#    post :publish, :map => "/publish", :provides => :json do
#        {:path => publish_image(params[:image][:path], params[:image][:album])}.to_json
#    end
end
