const {authJwt} = require("../middlewares");
const controller = require("controllers/user.controller");
const { allAccess } = require("../controllers/user.controller");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //GET routes por Authorization
    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


};