var app = {
  // Where application is stored.
  mainElement: $("body"),

  // Store reference to API.
  api: "http://api.openweathermap.org/data/2.5/"
};

// This is triggered in the HTML once all the source code loads.
app.initialize = function() {
  // Store reference to Router.
  app.router = new Router();

  // Kick off the Backbone route handling.
  Backbone.history.start();
};
