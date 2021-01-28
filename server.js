//server main file

//imports dependecies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//instantiate express server
const app = express();

//
let corsOptions = {
    origin:"http://localhost:8081"
};


app.use(cors(corsOptions));

//parse json
app.use(bodyParser.json);

//parse urlenconded, POST requests
app.use(bodyParser.urlencoded({extended:true}));

//run server on localhost
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`>>> Server is running on port ${PORT}.`)
});
