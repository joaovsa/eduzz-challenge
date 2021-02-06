const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //POST routes for Authentication
    app.post(
      "/api/auth/signup",
      [
          verifySignUp.checkUserData,
          verifySignUp.checkUserEmail
      ],
      controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
    

};