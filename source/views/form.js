var FormView = Backbone.View.extend({
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

    // Attempt to use geolocation, unless previously failed.
    if (navigator.geolocation && this.tryGeolocation) {
      navigator.geolocation.getCurrentPosition(function(geo) {
        var lat = geo.coords.latitude;
        var lng = geo.coords.longitude;

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
    this.input.trigger("blur");
    app.router.navigate("weather/" + this.input.val(), true);

    return false;
  },

  autoDetect: function(ev) {
    this.tryGeolocation = true;

    this.changeWeather();
  },

  initialize: function() {
    this.input = this.$("input");
  }
});
