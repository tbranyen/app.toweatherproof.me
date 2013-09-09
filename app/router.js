define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var $ = require("jquery");

  var app = require("app");
  var Form = require("modules/form");
  var Weather = require("modules/weather");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index",
      "weather/:city": "showWeather",
      "weather/:lat/:lng": "showWeatherByLatLng"
    },

    initialize: function() {
      // DOM constants.
      this.background = $(".background");
      this.weather = $(".weather");

      this.weatherModel = new Weather.Model();

      // Used to show current weather.
      this.weatherView = new Weather.View({
        model: this.weatherModel
      });

      this.formView = new Form.View({
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
      this.formView.tryGeolocation = false;

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
    },

    showWeatherByLatLng: function(lat, lng) {
      this.background.addClass("flip");
      this.weather.empty();
      this.formView.tryGeolocation = false;

      this.weatherModel.useLatLng = true;
      this.weatherModel.set({
        "lat": lat, "lng": lng
      });

      // Get the latest weather.
      this.weatherModel.fetch();

      // Show weather view once data has been fetched.
      this.weatherModel.once("sync", function() {
        this.weatherView.render();

        // Set to city name from API.
        this.formView.$("input").val(this.weatherModel.get("name"));

        // Hard reset the url to this new name.
        app.router.navigate("weather/" + this.weatherModel.get("name"));
      }, this);

      this.weather.append(this.weatherView.el);
    }
  });
});
