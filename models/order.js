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
        Apple9: Number,
        Apple6: Number,
        Chocolate9: Number,
        Chocolate6: Number,
        Cranberry9: Number,
        Cranberry6: Number,
        Maple9: Number,
        Maple6: Number,
        Pear9: Number,
        Pear6: Number,
        Pecan9: Number,
        Pecan6: Number,
        Pumpkin9: Number,
        Pumpkin6: Number
    },
    request: { type: String },
    created_at: { type: Date, default: Date.now }
    //pieOrder: {type: Array, default: []}
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;