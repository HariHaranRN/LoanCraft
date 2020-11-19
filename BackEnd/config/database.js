var mongoose = require("mongoose");
var path = require("path");
var dbPath = require(__dirname + path.sep + "defaults" + path.sep + "db.json");
mongoose.Promise = require("bluebird");
var exports = module.exports = {};

var option = {
    socketTimeoutMS: 300000,
    keepAlive: true,
    reconnectTries: 30000,
    useMongoClient: true,
    poolSize: 5
};

mongoose.set("debug", function (collectionName, method, query, doc) {
    console.log(collectionName + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
});

exports.init = function (env, dbCallBack) {
    var dbInstance = mongoose.connection;

    dbInstance.once("open", function () {
        dbInstance.on("error", function (err) {
            dbCallBack("DB Connection Error: " + err);
        });
        dbInstance.on("close", function (str) {
            dbCallBack("DB Connection Closed: " + str);
        });
        dbCallBack(null);
    });

    var DB_PATH = dbPath["mongo_" + env];
    if (DB_PATH) {
        mongoose.connect(DB_PATH, option).then(function () {
            //connected successfully
        }, function (err) {
            console.log("Error while mongo connection", err)
        });

    } else {
        dbCallBack("DB Details Missing");
    }
};
exports.release = function () {
    mongoose.disconnect();
};

exports.mongoose = mongoose;