const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    console.log("PASS:" + req.body.password);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save(err => {
        if(err){
           res.status(500).send({message:err});
           return;
        }
        res.send({message: "User successfully registered."});
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user)=>{
        if(err) {
            res.status(500).send({message:err});
        }
        if (!user){
            return res.status(404).send({message:"User not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message: "Invalid Password."
            });
        }

        var token = jwt.sign(
            {id: user.id}, 
            config.secret, 
            {expiresIn:1000} 
        );

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    });
};