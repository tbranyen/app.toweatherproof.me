define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var app = require("app");

  exports.View = Backbone.View.extend({
    el: ".pure-form",

    events: {
      "click input": "changeWeather",
      "submit": "showWeather",
      "click .detect": "autoDetect"
    },

    changeWeather: function(ev) {
      app.router.navigate("", true);
      this.input.val("");
    },

    showWeather: function(ev) {
      // Lose focus on the input to make the animation look nicer.
      this.input.trigger("blur");
      app.router.navigate("weather/" + this.input.val(), true);

      return false;
    },

    // Will automatically retry if selected.
    autoDetect: function(ev) {
      // Attempt to use geolocation, unless already found.
      if (navigator.geolocation) {
        // Find the current position.
        navigator.geolocation.getCurrentPosition(
          // Success.
          function(geo) {
            // Find the lat and long.
            var lat = geo.coords.latitude;
            var lng = geo.coords.longitude;
  
            // Lose focus on the input to make the animation look nicer.
            this.input.trigger("blur");
            app.router.navigate("weather/" + lat + "/" + lng, true);
          }.bind(this),
  
          // Failure.
          function() {
            this.input.prop("placeholder",
              "Unable to get location, please type manually.");
          }.bind(this),

          {
            // If a location is not found after five seconds, timeout.
            timeout: 5000
          }
        );
      }
    },

    initialize: function() {
      // Cache the input lookup.
      this.input = this.$("input");
    }
  });
});
