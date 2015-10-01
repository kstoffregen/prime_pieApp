var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Pie = require('../models/pies.json');

function makePrettyPies(order){
    var pieOrder = [];
    order.forEach(function(item, index){
        var customer = [];
        Pie.forEach(function (elem){
            if(order[index].pie[elem.id]){
                customer.push(elem.title);
                customer.push(order[index].pie[elem.id])
            }
        });
        pieOrder.push(customer);
    });
    return pieOrder;
}

/* GET list of orders */
router.post('/log', function(req, res, next){
    Order.forEach(function(err, order, pieOrder){
        if(err){
            console.log(err)
        } else {
            console.log('in get else');
            makePrettyPies(order);
            res.json(pieOrder);
        }
    });
});

/* POST complete pie info */
//router.post('/log', function(req, res, next){
//    Order.update(req.body[elem.id], pieOrder, function(){
//        makePrettyPies(req, res, order);
//    });
//
//
//});



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