//server main file

//imports dependecies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoAtlasUriUsers = "mongodb+srv://admin:admin@cluster0.cvkwf.mongodb.net/users?retryWrites=true&w=majority";



//instantiate express server
const app = express();

//
let corsOptions = {
    origin:"http://localhost:8081"
};


app.use(cors(corsOptions));

//parse json
app.use(bodyParser.json());

//parse urlenconded, POST requests
app.use(bodyParser.urlencoded({extended:true}));

//db constants
const db = require("./app/models");
const User = db.user;

db.mongoose.connect(
    mongoAtlasUriUsers,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Successfully connect to Mongo Atlas via Mongoose");
        //initial();
    })
    .catch((err)=>{
        console.log("Connection error: " + err);
        process.exit();
    });


//default route
app.get("/", (req,res)=>{
    console.log("get received");
    res.json({message: 'Application running'});
});

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/wallet.routes")(app);

//run server on localhost
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`>>> Server is running.`)
});

//insert some dummy data
/*function initial (){
    let newUser = User({
        username: 'joe',
        email: 'joe@johnas',
        password: 'joe'
    }).save( err =>{
        if (err) {
            console.log("Saving error: " + err);
        }
        console.log('Added dummy user to database');
    });
}*/