var express = require("express");
var path = require("path");
var connector = require(path.join(__appbase, "config", "connector.js"));
var globals = connector.__globals;
var router = express.Router();

exports.init_route = function () {
    var newLoan = require(globals.ROUTE_DIRMASTER + path.sep + "newLoan.js");
    router.post("/", newLoan.Get);
    router.post("/getByID", newLoan.GetByID);
    router.post("/add", newLoan.Add);
    router.put("/update", newLoan.Update);
    router.put("/updateStatus", newLoan.UpdateStatus);
    router.put("/updateInterest", newLoan.UpdateInterest);
    router.post("/delete", newLoan.Delete);
    return router;
};
