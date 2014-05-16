var moment_batches = require("./index.js");
var argv = require('minimist')(process.argv.slice(2));
var dotty = require("dotty");
var date = (dotty.exists(argv, "date")) ? argv.date : undefined;
var batch_number = moment_batches("2014-04-01", "15", date);
console.log(batch_number);