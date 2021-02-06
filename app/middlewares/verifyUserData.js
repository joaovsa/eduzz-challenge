const db = require("../models");
const User = db.User;

//TODO: Dry this

//REST errors: 400  client messed up |  500 Server error
checkUserData = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user)=>{
        if (err) {
            res.status(500).send({message:"An error ocurred"+err});
            return;
        }

        if (user) {
            res.status(400).send({message:"User already exists, try again!"});
        }
    });
    next();
};

checkUserEmail = (req, res, next) => {
    //TODO: add regex data validation
    User.findOne({
        email: req.body.email
    }).exec((err, user)=>{
        if (err) {
            res.status(500).send({message:"An error ocurred"+err});
            return;
        }

        if (user) {
            res.status(400).send({message:"E-mail already in use. Have you forgotten your user?"});
            //TODO: send user via e-mail
        }
    });
    next();
};

const verifySignUp = {
    checkUserData,
    checkUserEmail
};

module.exports = verifySignUp;