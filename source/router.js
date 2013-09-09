var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "weather/:city": "showWeather"
  },

  initialize: function() {
    // DOM constants.
    this.background = $(".background");
    this.weather = $(".weather");

    this.weatherModel = new WeatherModel();

    // Used to show current weather.
    this.weatherView = new WeatherView({
      model: this.weatherModel
    });

    this.formView = new FormView({
      model: this.weatherModel
    });

    // Only animate well after application has loaded.
    window.setTimeout(function() {
      app.mainElement.addClass("animate");
    }, 250);
  },

  index: function() {
    this.background.removeClass("flip");
    this.weather.empty();
  },

  showWeather: function(city) {
    this.background.addClass("flip");
    this.weather.empty();

    this.weatherModel.set("name", city);

    // Redundant.
    this.formView.$("input").val(city);

    // Get the latest weather.
    this.weatherModel.fetch();

    // Show weather view once data has been fetched.
    this.weatherModel.once("sync", function() {
      this.weatherView.render();
    }, this);

    this.weather.append(this.weatherView.el);
  }
});
