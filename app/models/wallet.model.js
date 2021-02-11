const mongoose = require("mongoose");

const Wallet = mongoose.model(
    "Wallet",
    mongoose.Schema({
        username: String,
        currencies:[{  
            currency: String,
            balance : Number}
        ] 
    }),
    "wallets"
);

module.exports = Wallet;