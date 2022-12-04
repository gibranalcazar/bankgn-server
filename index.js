const express   = require('express');
const app       = express();
const cors      = require('cors');
var dal         = require('./dal.js');
require('dotenv').config();
//const connectDb = require('./src/database');

//app.use(express.static('../client/public'));
app.use(express.static('../client/build'));
app.use(cors());

console.log(process.env.ALLOWED_ORIGINS);
/* app.use(cors(
    {
      origin: process.env.ALLOWED_ORIGINS
    }
  )); */


// Create user account
//deberia ser app.post? dice Arturo / put para actualizar/ delete to delete
app.get('/account/create/:name/:email/:password/:balance', function (req,res){
    dal.create(req.params.name, req.params.email, req.params.password, req.params.balance)
    .then((user) => {
        console.log(user);
        res.send(user);
    });
});

// all accounts
app.get('/account/all', function(req, res){
    dal.all()
    .then((info) => {
        console.log(info);
        res.send(info);
    });
});

// balance
app.get('/account/balance/:email', function (req, res){
    dal.balance(req.params.email)
    .then((balanceActual) => {
        console.log(balanceActual);
        res.send(balanceActual);
    });
});

// deposit
app.get('/account/deposit/:email/:balance', function(req, res){
    dal.deposit(req.params.email, req.params.balance)
    .then((info) => {
        console.log(info);
        res.send(info);
    });
});

// withdraw
app.get('/account/withdraw/:email/:balance', function(req, res){
    dal.withdraw(req.params.email, req.params.balance)
    .then((info) => {
        console.log(info);
        res.send(info);
    });
});

// login user
app.get('/account/login/:email/:password', function (req, res){
    res.send({
        email:      req.params.email,
        password:   req.params.password
    });
});

// transfer
app.get('/account/login/:email/:password', function (req, res){
    res.send({
        email:      req.params.email,
        password:   req.params.password
    });
});


var port = 4000;
app.listen(port);
console.log('Running on port: ' + port);