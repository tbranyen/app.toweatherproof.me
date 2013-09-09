define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var app = require("app");

  exports.View = Backbone.View.extend({
    el: ".pure-form",

    tryGeolocation: true,

    events: {
      "click input": "changeWeather",
      "submit": "showWeather",
      "click .detect": "autoDetect"
    },

    changeWeather: function(ev) {
      app.router.navigate("", true);
      this.input.val("");

      // Attempt to use geolocation, unless already found.
      if (navigator.geolocation && this.tryGeolocation) {
        // Find the current position.
        navigator.geolocation.getCurrentPosition(function(geo) {
          var lat = geo.coords.latitude;
          var lng = geo.coords.longitude;

          // Lose focus on the input to make the animation look nicer.
          this.input.trigger("blur");
          app.router.navigate("weather/" + lat + "/" + lng, true);

          // On error, do not try again.
          this.tryGeolocation = false;
        }.bind(this), function() {
          // On error, do not try again.
          this.tryGeolocation = false;
        }.bind(this));
      }
    },

    showWeather: function(ev) {
      // Lose focus on the input to make the animation look nicer.
      this.input.trigger("blur");
      app.router.navigate("weather/" + this.input.val(), true);

      return false;
    },

    // Will automatically retry if selected.
    autoDetect: function(ev) {
      this.tryGeolocation = true;
      this.changeWeather();
    },

    initialize: function() {
      // Cache the input lookup.
      this.input = this.$("input");
    }
  });
});
