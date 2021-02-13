//index js of models package, executed when required.
//imports
const mongoose = require("mongoose");

//Promisse represents completion/failure of assync process
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.wallet = require("./wallet.model")


module.exports = db;