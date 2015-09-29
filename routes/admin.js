var express = require('express');
var router = express.Router();
var Order = require('../models/order');

/* GET list of orders */
router.get('/', function(req, res, next){
    Order.forEach(function(){
        res.send(req.body);
    })
});

//router.delete('/', function(){
//
//});