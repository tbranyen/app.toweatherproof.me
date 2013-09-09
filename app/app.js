define(function(require, exports, module) {
  "use strict";

  var $ = require("jquery");

  // The root path to run the application through.
  exports.root = "/";

  // Where application is stored.
  exports.mainElement = $("body");

  // Store reference to API.
  exports.api = "http://api.openweathermap.org/data/2.5/";
});
