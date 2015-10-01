var express = require('express');
var router = express.Router();
var Order = require('../models/order');
//var Pie = require('../models/pies.json');
//
//function makePrettyPies(order){
//    var pieOrder = [];
//    order.forEach(function(item, index){
//        var customer = [];
//        Pie.forEach(function (elem){
//            if(order[index].pie[elem.id]){
//                customer.push(elem.title);
//                customer.push(order[index].pie[elem.id])
//            }
//        });
//        pieOrder.push(customer);
//    });
//    return pieOrder;
//}
//
///* POST pretty pie display */
//router.post('/log', function(req, res, next){
//    Order.forEach(function(err, order, pieOrder){
//        if(err){
//            console.log(err)
//        } else {
//            console.log('in get else');
//            makePrettyPies(order);
//            res.json(pieOrder);
//        }
//    });
//});

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