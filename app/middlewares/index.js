const authJwt = require("./authJwt");
const verifySignUp = require("./verifyUserData")
const mailSender = require("./sendMail")
module.exports = {
    authJwt,
    verifySignUp,
    mailSender
};
