var mongoose = require('mongoose');
var schema = mongoose.Schema;

//create Mongoose Schema for orders
var orderSchema = new schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    contactMethod: {
        email: Boolean,
        call: Boolean,
        text: Boolean
    },
    pickup: { type: String, required: true },
    pie: {
        apple9: Number,
        apple6: Number,
        chocolate9: Number,
        chocolate6: Number,
        cranberry9: Number,
        cranberry6: Number,
        maple9: Number,
        maple6: Number,
        pear9: Number,
        pear6: Number,
        pecan9: Number,
        pecan6: Number,
        pumpkin9: Number,
        pumpkin6: Number
    },
    request: { type: String },
    created_at: { type: Date, default: Date.now },
    pieOrder: {type: Array, default: []}
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;