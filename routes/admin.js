var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var pie = require('../models/pies.json');

/* GET list of orders */
router.get('/log', function(req, res, next){
    Order.find(function(err, log){
        if(err){
            console.log(err)
        } else {

            //makePrettyPies();

            res.json(log);
            console.log(log);
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