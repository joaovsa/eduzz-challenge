const {authJwt} = require("../middlewares");
const controller = require("../controllers/wallet.controller");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/wallet/create",
        [
            authJwt.verifyToken
        ],
        controller.insertEmptyWallet
    );

    app.post(
        "/api/wallet/add",
        [
            authJwt.verifyToken
        ],
        controller.addBrlBalance
    );

    app.get(
        "/api/wallet/balance",
        [
            authJwt.verifyToken
        ],
        controller.getWallet
    );


};