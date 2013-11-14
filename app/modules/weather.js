define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var app = require("app");

  exports.Model = Backbone.Model.extend({
    url: function() {
      var base = app.api + "weather?callback=?&";

      // If we are not using Lat and Lng use the query search.
      if (!this.useLatLng) {
        return base + "q=" + this.get("name");
      }

      // Otherwise be more specific and fetch the exact weather.
      return base + "lat=" + this.get("lat") + "&lon=" + this.get("lng");
    },

    parse: function(resp) {
      // Convert Kelvin to Fahrenheit.
      resp.main.temp = Math.floor((resp.main.temp - 273.15) * 1.8) + 32 + " F";
      // Add a percentage sign.
      resp.main.humidity = resp.main.humidity + "%";
      // Add sea level (mb) unit.
      resp.main.pressure = resp.main.pressure + " MB";
      // Convert wind speed to MPH.
      resp.wind.speed = (resp.wind.speed * 1.15078).toFixed(2) + " MPH";
      // Add deg symbol.
      resp.wind.deg = resp.wind.deg + "&deg;";

      return resp;
    }
  });

  exports.View = Backbone.View.extend({
    initialize: function() {
      this.template = require("ldsh!templates/weather");
    },

    render: function() {
      this.$el.html(this.template(this));
    },
 
    renderFailure: function() {
      this.$el.html("Unable to get weather at this time.");
    }
  });
});