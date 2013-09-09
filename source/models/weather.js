var WeatherModel = Backbone.Model.extend({
  url: function() {
    return app.api + "weather?callback=?&q=" + this.get("name")
  },

  parse: function(resp) {
    // Convert Kelvin to Fahrenheit.
    resp.main.temp = Math.floor((resp.main.temp - 273.15) * 1.8) + 32 + " F";
    // Add a percentage sign.
    resp.main.humidity = resp.main.humidity + "%";
    // Add sea level (mb) unit.
    resp.main.pressure = resp.main.pressure + " mb";
    // Convert wind speed to MPH.
    resp.wind.speed = (resp.wind.speed * 1.15078).toFixed(2) + " mph";
    // Add deg symbol.
    resp.wind.deg = resp.wind.deg + "&deg;";

    return resp;
  }
});
