var express = require('express'),
    router = express.Router(),
    Orders = require('../models/order');

router.post('/', function(req, res, next) {
    Orders.getAuthenticated(req.body, function(err, token) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        } else {
            res.send(token);
        }
    });
});

module.exports = router;