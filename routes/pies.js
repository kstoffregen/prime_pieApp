var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET pie info. */
router.get('/', function(req, res, next) {
    var name = req.params.name;
    var price = req.params.price;
    var file = path.join(__dirname,'../models/pies.json');
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            next(err);
        } else {
            var pie = JSON.parse(data);

            pie.forEach(function(elem){
                if(elem.id == id){
                    pie = elem;
                }
            });

        };
        res.json(pie);

    })
});

module.exports = router;