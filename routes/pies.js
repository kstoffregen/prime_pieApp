var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET pie info. */
router.get('/', function(req, res, next) {
    var price, id, total;
    var file = path.join(__dirname,'../models/pies.json');
    fs.readFile(file, 'utf8', function(err, data){
        price = req.params.price;
        id = req.params.id;

        if(err){
            next(err);
        } else {
            var pie = JSON.parse(data);
            console.log("Route:", pie);
            pie.forEach(function(elem){
                if(elem.id == id){
                    return total += price;
                }
            });

        };
        res.json(total);

    })
});

module.exports = router;