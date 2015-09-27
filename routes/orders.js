var express = require('express'),
    router = express.Router(),
    Order = require('../models/order');

/* POST: create order */
router.post('/', function (req, res, next) {

  var order = new Order(req.body);

  order.save(req.body, function (err, order) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.send(order.toJSON());
      console.log(order);
    }
  })
});

module.exports = router;
