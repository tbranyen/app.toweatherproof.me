define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var $ = require("jquery");

  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = "/";

  // Where application is stored.
  app.mainElement = $("main");

  // Store reference to API.
  app.api = "http://api.openweathermap.org/data/2.5/";
});
