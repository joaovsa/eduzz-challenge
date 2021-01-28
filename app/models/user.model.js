//import 
const mongoose = require("mongoose");

//define User model with expected Schema
let User = mongoose.model(
    "User",
    mongoose.Schema({
        username: String,
        email: String,
        password: String
    })
);

module.exports = User;