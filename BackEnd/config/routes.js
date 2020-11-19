var path = require("path");

exports.init = function (app) {
  var route_Master = path.join(__dirname, "routes", "Master");


  var newLoan_route = require(route_Master + path.sep + "newLoan_route.js");
  app.use("/newLoan", newLoan_route.init_route());

  var history_route = require(route_Master + path.sep + "history_route.js");
  app.use("/history", history_route.init_route());
};
