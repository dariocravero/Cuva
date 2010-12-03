Cuva.controllers :images do
    set :haml, :format => :html5

    get :index, :map => "/" do

        render "images/index"
    end

    post :upload, :map => '/upload' do
        if !session.key?(:path)
            session[:path] = "public/images/" + Time.now.to_i.to_s + "/"
            begin
                Dir.mkdir(session[:path])
            rescue
            end
        end

        fname = session[:path] + env['HTTP_X_FILE_NAME']
        tempfile = File.new(fname, "wb")
        tempfile << env["rack.input"].read
        tempfile.close

        JSON.generate({:image => fname.gsub("public", "")})
    end
end
