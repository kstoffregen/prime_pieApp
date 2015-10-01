var express = require('express');
var router = express.Router();
var Order = require('../models/order');

/* GET list of orders */
router.get('/log', function(req, res, next){
    Order.find(function(err, order){
        if(err){
            console.log(err)
        } else {
            res.json(order);
        }
    });
});




//router.delete('/', function(){
//
//});

//var results = [];
//results.push(req.body);
////Order.forEach(function(){
////    results.push(req.body);
////    //res.send(req.body);
////});
//res.send(results);

module.exports = router;