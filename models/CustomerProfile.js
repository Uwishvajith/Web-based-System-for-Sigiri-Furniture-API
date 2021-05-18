const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    NIC : {
        type :String,
        required :true,
        unique: true,
        maxlength: 10

    },

    name : {
        type :String,
        required :true,
        maxlength :200

    },

    organization : {
        type :String,
        maxlength:100,

    },

    address : {
        type :String,
        maxlength :200

    },

    contactNo : {
        type : Number,
        required :true,
        maxlength :9
    },

    email : {
        type :String,
        required :true,
        unique:true,
        lowercase:true,
        maxlength : 100
    },

    regDate : {
       
    },

    empId : {
        type :String,
        required :true,
        maxlength:5,
        minlength:5
    }

})

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;