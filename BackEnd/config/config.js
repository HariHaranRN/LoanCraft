var database = require("./database.js");
var routes = require("./routes.js");
var cors = require("cors");
var errorHandler = require("errorhandler");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var fs = require("fs");
var rfs = require("rotating-file-stream");
var path = require("path");
var express_validator = require("express-validator");
var __ = require("underscore");

module.exports = {
    init: function (app_express) {
        var app = app_express();
        var env = app.get("env");
        database.init(env, function (err) {
            if (err) {
                console.log(err);
                database.release();
                return process.exit(-1);
            }
            else {
                var logDirectory = path.join(__appbase, "log");
                fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
                if (fs.existsSync(logDirectory)) {
                    var accessLogStream = rfs('app.log', {
                        interval: "1d",
                        path: logDirectory
                    });
                    app.use(morgan('combined', { stream: accessLogStream }));
                }
                if (app.get("env") === "development") {
                    app.use(errorHandler());
                }
                app.use(cors());
                app.use(bodyParser.json({ limit: '50mb' }))
                app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
                app.use(express_validator({
                    errorFormatter: function (param, msg, value) {
                        var namespace = param.split(".");
                        var root = namespace.shift();
                        var formParam = root;
                        while (namespace.length) {
                            formParam += "[" + namespace.shift() + "]";
                        }
                        return {
                            param: formParam,
                            msg: msg,
                            value: value
                        }
                    },
                    customValidators: {
                        isArray: function (value) {
                            return Array.isArray(value);
                        },
                        isPredefined: function (value, list) {
                            return __.contains(list, value);
                        }
                    }
                }));

                routes.init(app);
                app.listen(92, function () {
                    console.log("Listening In 92 Port");
                });
            }
        });

        process.on('SIGTERM', function () {
            process.exit(-1)
        });
        process.on('SIGINT', function () {
            process.exit(2);
        });
        process.on('exit', function (code) {
            database.release();
            console.log(code);
        });
    }
};
