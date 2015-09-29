var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    if (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
        var token = jwt.sign({ username: process.env.USERNAME }, 'supersecret', {expiresInMinutes:1440});
        res.send(token);

    } else {
        res.send(400);
    }
});

module.exports = router;