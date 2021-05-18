var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route')

//mongo db conection

mongoose.connect("mongodb://localho.st:27017/contactlist");
mongoose.connection.on('connected',() =>{
    console.log("DB connected");
});
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("Error",err);
    }
});

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api',route);
//static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
    res.send("Welcome!");
});

app.listen(port,()=>{
    console.log("Server is started at the port",port);
});


