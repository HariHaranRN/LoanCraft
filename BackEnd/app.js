
var express = require("express");
var path=require("path");
var multer = require('multer');

global.__appbase=__dirname;

var config_path=path.join(__appbase,"config","config.js");
var config=require(config_path);
config.init(express);
 