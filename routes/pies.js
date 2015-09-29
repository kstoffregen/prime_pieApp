var express = require('express');
var router = express.Router();
var pie = require('../models/pies.json');

/* POST customer order total */
router.post('/', function (req, res, next) {
    console.log(req.body);
    var total = 0;
    pie.forEach(function (elem) {
        if (req.body[elem.id]) {
            total += elem.price * req.body[elem.id];
        }
    });
    res.json(total);
});

module.exports = router;