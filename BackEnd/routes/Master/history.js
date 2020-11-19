var path = require("path");
var connector = require(path.join(__appbase, "config", "connector.js"));
var globals = connector.__globals;
var app_model = connector.app_model;
var History = app_model.History;
var Moment = globals.Moment;
var uniqid = require('uniqid');
var ObjectId = require('mongoose').Types.ObjectId;

exports.GetByID = function (req, res) {
    var isActive = req.body.isActive;
    var loanID = req.body.loanID;
    History.aggregate([
        { $match: { loanID:loanID} },
        { $sort: { loanID: 1, createdDate: -1 } }
    ]).then(function (historyList) {
        if (historyList != null) {
            res.json(globals.createResponse("Loan Details Retrieved Successfully", historyList, 200));
        }
        else {
            res.json(globals.createEResponse("Loan Details Requirement invalid", 500));
        }
    });
};

exports.Add = function (req, res) {
    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            var loanID = req.body.loanID;
            var interestAmount = req.body.interestAmount;
                    var addHistory = new History({
                        loanID: loanID,
                        interestAmount: interestAmount,
                        createdDate: globals.Moment.utc()
                    });
                    addHistory.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.json(globals.createEResponse(err.message, 500));
                        }
                        else {
                            res.json(globals.createResponse("History Added Successfully", data, 200));
                        }
                    });
        }
    });
};
