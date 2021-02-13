const nodemailer = require("nodemailer");
const db = require("../models");
const Wallet = db.wallet;

//create new wallet for new user
exports.insertEmptyWallet = (req, res)=>{
    try{
        console.log("In try");
        Wallet.findOne({
            username: req.body.username
        })
        .exec((err, wallet)=>{            
            console.log("exec in ")
            if(err) {
                res.status(500).send({message:"Uh-oh" + err});
            }
            if (wallet){
                return res.status(400).send({message:"User already has wallet."});
            }
            console.log("User does not have wallet")
            const new_wallet = new Wallet({
                username: req.body.username,
                currencies: [{currency:"BRL", balance: 0.00},
                {currency:"BTC", balance:0.0000000}
                ]
            });

            new_wallet.save(err => {
                if(err){
                   res.status(500).send({message:err});
                   return;
                }
                res.status(200).send({message: "Wallet successfully registered for " + req.body.username});
            });

        });
    } catch(err){
        console.log("error")
        return res.status(500).send({message: "Somethin went wrong: " + err});
    }
};

//adds balance for each currency (if exists)
exports.addBrlBalance = (req, res)=>{
    try{
        console.log("In try");
        Wallet.findOne({
            username: req.body.username
        })
        .exec((err, wallet)=>{            
            console.log("exec in ")
            if(err) {
                res.status(500).send({message:"Uh-oh" + err});
            }
            if (!wallet){
                return res.status(400).send({message:"Wallet not found"});
            }
            console.log("User HAS wallet")
                        
            wallet.currencies.forEach(element => {                
                switch(element.currency){
                    
                    case("BRL"):
                        //O(n²) loop, but currencies arr will never too large to cause any performance issue
                        let new_balance = 0
                        req.body.currencies.forEach(obj=>{
                            if(obj.currency === "BRL"){
                                new_balance = obj.balance;
                            }
                        });

                        //adds new balance to current wallet
                        element.balance += new_balance
                        break;
                    default:
                        res.status(400).send({message:"Currency not allowed"});
                }
            });

            wallet.save(err => {
                if(err){
                   res.status(500).send({message:err});
                   return;
                }

                res.status(200).send({message: "BRL balance added for " + req.body.username});
            });

        });
    } catch(err){
        console.log("error")
        return res.status(500).send({message:"Somethin went wrong: " + err});
    }
};

exports.getWallet = (req, res)=>{
    try{
        console.log("Finding wallet");
        Wallet.findOne({
            username: req.body.username
        })
        .exec((err, wallet)=>{            
            console.log("Wallet search ended")
            if(err) {
                res.status(500).send({message:"Uh-oh" + err});
            }
            if (!wallet){
                return res.status(400).send({message:"Wallet not found"});
            }
            return res.json(wallet);
        });
    } catch(err){
        return res.status(500).send({message:"Somethin went wrong: " + err});
    }
};