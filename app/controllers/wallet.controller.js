const db = require("../models");
const Wallet = db.wallet;
const User = db.user;

const middlewares = require("../middlewares");
const mailSender = middlewares.mailSender;

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
            
            let balance_mail = 0;
            let i = 0;
            let flag_error = false;
            req.body.currencies.forEach((element, index, array) => {               
                console.log("Current Currency: " + element.currency);
                i++;
                switch(element.currency){
                    
                    case("BRL"):
                        //O(n²) loop, but currencies arr will never too large to cause any performance issue                        
                        let new_balance = 0
                        wallet.currencies.forEach(obj=>{
                            if(obj.currency === "BRL"){
                                new_balance = obj.balance;
                                
                                //load balance for email purpose
                                balance_mail = new_balance;
                            }
                        });

                        //adds new balance to current wallet
                        element.balance += new_balance
                        break;
                    case("BTC"):
                        console.log("BTC currency");
                        break;
                    default:
                        console.log("Tried add not allowed currency. Flag: "+ flag_error);
                        flag_error = true;
                        return res.status(402).send({message:"Currency "+ element.currency + " not recognized" });

                }   

                console.log("I: " + i + "Array len " + array.length);
                
                //saves when last is done AND currency is legit
                if(!flag_error && i===array.length){
                    wallet.save(err => {
                        if(err){
                           res.status(500).send({message:err});
                           return;
                        }
        
                        //retrieve user mail
                        let email = "";
                        const user_name = req.body.username;
                        try{
                            User.findOne({
                                username: req.body.username
                            }).exec((err, user)=>{            
                                console.log("User email search ended")
                                if(err) {
                                    res.status(500).send({message:"Uh-oh" + err});
                                }
                                if (!user){
                                    return res.status(400).send({message:"User not found... weird."});
                                }
        
                                email = user.email;
                                console.log("user mail found: " + email);       
                                
                                const brl_mail_dict = {
                                    currency: "BRL",
                                    balance: balance_mail
                                };
                
                                //send email 
                                console.log("sending email to: " + email);
                                mailSender.sendMailBalanceAdded(email, user_name, brl_mail_dict);
                                res.status(200).send({message: "BRL balance added for " + req.body.username});
                            });
                        }catch(err){
                            console.log("Could not find user by wallet username");
                            return res.status(500).send({message:"Could not find user by wallet username" + err});
                        }                       
                    });
                }
            });

            
        });
    } catch(err){
        console.log("Finding wallet error")
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