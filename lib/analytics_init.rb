module AnalyticsInitializer
  def self.registered(app)
    app.use Rack::GoogleAnalytics, :tracker => 'UA-20065500-1'

  end
end
