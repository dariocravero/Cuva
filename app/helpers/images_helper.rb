# Helper methods defined here can be accessed in any controller or view in the application

Cuva.helpers do
    def init_session(destroy=false)
        if destroy && !session.key?(:path)
            session[:path] = "public/images/" + Time.now.to_i.to_s + "/"
            begin
                Dir.mkdir(session[:path])
            rescue
            end
        end
    end

    def save_temporary_image
        file_name = session[:path] + env['HTTP_X_FILE_NAME']

        temp_file = File.new(file_name, "wb")
        temp_file << env["rack.input"].read
        temp_file.close

        file_name.gsub("public", "")
    end
end
