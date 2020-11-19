var mongoose = require("./database.js").mongoose;
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var uniqid = require('uniqid');
var model_dirMaster = path.join(__appbase, "models", "Master");
var route_dirMaster = path.join(__appbase, "routes", "Master");
var model_dirOrderEntry = path.join(__appbase, "models", "Orderentry");
var validators_dir = path.join(__appbase, "routes", "validators");
var nodemailer = require('nodemailer');
var Schema = mongoose.Schema;
var __ = require("underscore");
var EmailPath = require(__dirname + path.sep + "defaults" + path.sep + "email.json");

var Email_UserName = EmailPath["Email_UserName"];
var Email_Password = EmailPath["Email_Password"];
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: Email_UserName,
        pass: Email_Password
    }
});
smtpTransport.on('log', console.log);
var globals = (function () {
    return {
        mongoose: mongoose,
        Schema: Schema,
        Moment: moment,
        smtpTransport: smtpTransport,
        Uniqid: uniqid,
        ROUTE_DIRMASTER: route_dirMaster,
        VALIDATOR_DIR: validators_dir,
        fs: fs,
        _underscore: __,
        lodash: __,
        ObjectId: mongoose.Types.ObjectId,
        Schema_ObjectId: mongoose.Schema.Types.ObjectId,
        MODEL_LIST: {
        "NewLoan": "newLoan",
        "History": "history"
        },
        setOpts: function (query, opts, selectorList) {
            if (opts.isLean) {
                query.lean();
            }
            if (opts.selector) {
                var selectorIndex = opts.selector;
                if (selectorIndex > -1 && selectorIndex < selectorList.length)
                    query.select(selectorList[selectorIndex]);
            }
            return query;
        },
        checkValue: function (value) {
            return typeof value == "undefined" || value == "null" || value == null;
        },
        checkEmptyString: function (value) {
            return value.length == 0;
        },
        checkUndefined: function (value) {
            return typeof value == "undefined";
        },
        checkValueEmpty: function (value) {
            return typeof value == "undefined" || value == "null" || value == null || value.length == 0;
        },
        checkValueSetEmptyString: function (value) {
            return this.checkUndefined(value) ? "" : value;
        },
        createResponse: function (message, data, code) {
            if (typeof code == "undefined") {
                code = 200;
            }
            var responseObj = {
                statusCode: code,
                message: message
            };
            if (typeof data !== "undefined" || data !== null) {
                responseObj["data"] = data;
            }
            return responseObj;
        },
        createEResponse: function (message, code) {
            if (typeof code == "undefined") {
                code = 204;
            }
            if (message.length == 0) {
                message = "Internal Server Error";
            }
            return {
                statusCode: code,
                message: message
            };
        },
        jsonConcat: function (target) {
            var sources = [].slice.call(arguments, 1);
            sources.forEach(function (source) {
                for (var prop in source) {
                    target[prop] = source[prop];
                }
            });
            return target;
        }
    };
})();

function initializeModels() {

    fs.readdirSync(model_dirMaster).forEach(function (name) {
        var file_path = path.join(model_dirMaster, name);
        var stat = fs.statSync(file_path);
        if (stat.isFile()) {
            require(file_path).init(globals);
        }
    });




    var model_list = globals.MODEL_LIST;
    var models = {};
    var owns = Object.prototype.hasOwnProperty;
    for (var key in model_list) {
        if (owns.call(model_list, key)) {
            var value = model_list[key];
            models[key] = mongoose.model(value);
        }
    }
    return models;
}

var models = initializeModels();

exports.__globals = globals;
exports.app_model = models;