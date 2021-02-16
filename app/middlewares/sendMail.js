//dotenv manages env variables, in which we stores API key (secret)
const path = require('path');
console.log("Path cfg env: " + path.resolve('.env'));
require('dotenv').config({
    path: path.resolve('.env')
});
const sgMail = require('@sendgrid/mail');


sendMailBalanceAdded = async (usr_mail, user_name, currency_dict) => {
    console.log('To email: ' + usr_mail);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const inner_text = "Hello, " +user_name + ", we've just received " 
        + currency_dict.currency+ " " + currency_dict.balance 
        + " from you. The amount is already available to operate with.";
    
    const msg = {
        to: [usr_mail],
        from: 'jvsms13@gmail.com',
        subject: 'Balance Updated :)',
        text: 'You just added more money to your account!',
        html: '<strong>'+inner_text+'</strong>',
    }
 
    try {
        //await so thread blocks waiting for email sucess or failure
        const result = await sgMail.send(msg);
        console.log('Email sent', result);
    }
    catch (error) {
        console.error("Could not send email via SendGrid: "+ error);
    }
};

module.exports = {
    sendMailBalanceAdded
};