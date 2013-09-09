var FormView = Backbone.View.extend({
  el: ".pure-form",

  events: {
    "click input": "changeWeather",
    "submit": "showWeather"
  },

  changeWeather: function(ev) {
    app.router.navigate("", true);
    this.input.val("");
  },

  showWeather: function(ev) {
    this.input.trigger("blur");
    app.router.navigate("weather/" + this.input.val(), true);

    return false;
  },

  initialize: function() {
    this.input = this.$("input");
  }
});
