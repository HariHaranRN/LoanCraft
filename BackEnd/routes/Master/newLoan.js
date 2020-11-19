var path = require("path");
var connector = require(path.join(__appbase, "config", "connector.js"));
var globals = connector.__globals;
var app_model = connector.app_model;
var NewLoan = app_model.NewLoan;
var Moment = globals.Moment;
var uniqid = require('uniqid');
var ObjectId = require('mongoose').Types.ObjectId;

exports.Get = function (req, res) {
    var isActive = req.body.isActive;
    NewLoan.aggregate([
        { $match: { isActive: isActive } },
        { $sort: { name: 1, createdDate: -1 } }
    ]).then(function (newLoanList) {
        if (newLoanList != null) {
            res.json(globals.createResponse("NewLoan List Retrieved Successfully", newLoanList, 200));
        }
        else {
            res.json(globals.createEResponse("Invalid NewLoan", 500));
        }
    });
};

exports.GetByID = function (req, res) {
    var isActive = req.body.isActive;
    var loanID = req.body.loanID;
    if(isActive == null || undefined || ""){
    NewLoan.aggregate([
        { $match: { loanID:loanID} },
        { $sort: { loanID: 1, createdDate: -1 } }
    ]).then(function (newLoanList) {
        if (newLoanList != null) {
            res.json(globals.createResponse("Loan Details Retrieved Successfully", newLoanList, 200));
        }
        else {
            res.json(globals.createEResponse("Loan Details Requirement invalid", 500));
        }
    }); 
    }else{
        NewLoan.aggregate([
            { $match: { isActive: isActive , loanID:loanID} },
            { $sort: { loanID: 1, createdDate: -1 } }
        ]).then(function (newLoanList) {
            if (newLoanList != null) {
                res.json(globals.createResponse("Loan Details Retrieved Successfully", newLoanList, 200));
            }
            else {
                res.json(globals.createEResponse("Loan Details Requirement invalid", 500));
            }
        }); 
    }
};

exports.Add = function (req, res) {
    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            var name = req.body.name;
            var pName = req.body.pName;
            var date = req.body.date;
            var mobileNo = req.body.mobileNo;
            var aMobileNo = req.body.aMobileNo;
            var address = req.body.address;
            var amount = req.body.amount;
            var interest = req.body.interest;
            var interestPaid = req.body.interestPaid;
            var notes = req.body.notes;

                    NewLoan.count({}).then(function (results) {
                    var getCount = 1000 + results + 1;
                    var loanID = "LID" + getCount;
                    var addNewLoan = new NewLoan({
                        loanID: loanID,
                        name: name,
                        pName: pName,
                        date: date,
                        mobileNo: mobileNo,
                        aMobileNo: aMobileNo,
                        address: address,
                        amount: amount,
                        interest: interest,
                        interestPaid: interestPaid,
                        notes: notes,
                        createdDate: globals.Moment.utc()
                    });
                    addNewLoan.save(function (err, data) {
                        if (err) {
                            console.log(err);
                            res.json(globals.createEResponse(err.message, 500));
                        }
                        else {
                            res.json(globals.createResponse("NewLoan Added Successfully", data, 200));
                        }
                    });
                });
        }
    });
};

exports.Update = function (req, res) {
    req.getValidationResult().then(function (validation_result) {
        if (validation_result.isEmpty()) {
            var r_id = req.body._id;
            var name = req.body.name;
            var pName = req.body.pName;
            var date = req.body.date;
            var mobileNo = req.body.mobileNo;
            var aMobileNo = req.body.aMobileNo;
            var address = req.body.address;
            // var amount = req.body.amount;
            // var interest = req.body.interest;
            // var interestPaid = req.body.interestPaid;
            var notes = req.body.notes;

            var updateNewLoan = NewLoan.findOneAndUpdate({ _id: r_id, }, {
                $set: {
                    name: name,
                    pName: pName,
                    date: date,
                    mobileNo: mobileNo,
                    aMobileNo: aMobileNo,
                    address: address,
                    // amount: amount,
                    // interest: interest,
                    // interestPaid: interestPaid,
                    notes: notes,
                    updatedDate: globals.Moment.utc()
                }
            }, { new: true }).exec();
            updateNewLoan.then(function (data) {
                if (data != null) {
                    res.json(globals.createResponse("NewLoan updated successfully", data, 200));
                }
                else {
                    res.json(globals.createEResponse("Failed to Update", 500));
                }
            })
        }
        else {
            res.json(globals.createEResponse(result.array()[0].msg, 422));
        }
    }).catch(function (e) {
        res.json(globals.createEResponse(e.message, 500));
    });
};


exports.UpdateStatus = function (req, res) {
    req.getValidationResult().then(function (validation_result) {
        if (validation_result.isEmpty()) {
            var r_id = req.body._id;
            var isActive = req.body.isActive;

            var updateStatus = NewLoan.findOneAndUpdate({ _id: r_id, }, {
                $set: {
                    isActive: isActive,
                    updatedDate: globals.Moment.utc()
                }
            }, { new: true }).exec();
            updateStatus.then(function (data) {
                if (data != null) {
                    res.json(globals.createResponse("Status updated successfully", data, 200));
                }
                else {
                    res.json(globals.createEResponse("Failed to Update", 500));
                }
            })
        }
        else {
            res.json(globals.createEResponse(result.array()[0].msg, 422));
        }
    }).catch(function (e) {
        res.json(globals.createEResponse(e.message, 500));
    });
};

exports.UpdateInterest = function (req, res) {
    req.getValidationResult().then(function (validation_result) {
        if (validation_result.isEmpty()) {
            var r_id = req.body._id;
            var interestPaid = req.body.interestPaid;

            var updateInterest = NewLoan.findOneAndUpdate({ _id: r_id, }, {
                $set: {
                    interestPaid: interestPaid,
                    updatedDate: globals.Moment.utc()
                }
            }, { new: true }).exec();
            updateInterest.then(function (data) {
                if (data != null) {
                    res.json(globals.createResponse("Interest updated successfully", data, 200));
                }
                else {
                    res.json(globals.createEResponse("Failed to Update", 500));
                }
            })
        }
        else {
            res.json(globals.createEResponse(result.array()[0].msg, 422));
        }
    }).catch(function (e) {
        res.json(globals.createEResponse(e.message, 500));
    });
};

exports.Delete = function (req, res) {
    var rID = req.body._id;
    var deleteNewLoan = NewLoan.find({ _id: rID }).remove().exec();
    deleteNewLoan.then(function (result) {
        res.json(globals.createResponse("NewLoan deleted successfully", result, 200));
    }).catch(function (e) {
        res.json(globals.createEResponse(e.message, 500));
    });
}