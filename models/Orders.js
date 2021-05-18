const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    orderId : {
        type :String,
        required :true,
        maxlength : 5,
        unique : true

    },

    cNIC : {
        type :String,
        required :true,
        minlength :10,
        maxlength : 10
    },

    type : {
        type :String,
        required :true,
        enum :['customized', 'ready-made'],
        maxlength:11
    },

    oDate : {
       

    },

    dAddress : {
        type :String,
        maxlength :100

    },

    additonalCharge : {
        type :Number
       
    },

    finalPrice : {
        type :Number,
        required :true
    },

    oStatus : {
        type :String,
        required :true,
        enum :['completed', 'pending','cancel'],
        maxlength:9
    },

    oEmpId : {
        type :String,
        required :true,
        maxlength:5,
        minlength:5
    }

})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;