var express = require("express");
var path = require("path");
var connector = require(path.join(__appbase, "config", "connector.js"));
var globals = connector.__globals;
var router = express.Router();

exports.init_route = function () {
    var history = require(globals.ROUTE_DIRMASTER + path.sep + "history.js");
    router.post("/getByID", history.GetByID);
    router.post("/add", history.Add);
    return router;
};
