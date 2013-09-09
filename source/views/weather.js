var WeatherView = Backbone.View.extend({
  initialize: function() {
    var contents = $("#weather-template").html();

    this.template = _.template(contents);
  },

  render: function() {
    this.$el.html(this.template(this));
  }
});
