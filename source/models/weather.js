var WeatherModel = Backbone.Model.extend({
  url: function() {
    var base = app.api + "weather?callback=?&";

    if (!this.useLatLng) {
      return base + "q=" + this.get("name");
    }

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
