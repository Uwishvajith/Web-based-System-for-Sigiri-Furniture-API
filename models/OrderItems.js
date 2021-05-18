const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const orderItemsSchema = new Schema({

    orderId : {
        type :String,
        required :true,
        maxlength : 5,
        unique : true

    },

    productId1 : {
        type :String,
        required :true,
        maxlength : 5,
        defaultValue:null
    },

    productId2 : {
        type :String,
        maxlength : 5,
        defaultValue:null
    },

    productId3 : {
        type :String,
        maxlength : 5,
        defaultValue:null
    },

    qty1 : {
        type :Number,
        required :true,
        min:0,
        max:20,
        defaultValue:null
    },

    qty2 : {
        type :Number,
        min:0,
        max:20,
        defaultValue:null
    },

    qty3 : {
        type :Number,
        min:0,
        max:20,
        defaultValue:null
    },

   feature1 :{
    type :String,
    maxlength : 20,
    defaultValue:null
    
   },

   feature2 :{
    type :String,
    maxlength : 20,
    defaultValue:null
    
   },

   feature3 :{
    type :String,
    maxlength : 20,
    defaultValue:null
    
   }

})

const OrderItems = mongoose.model("OrderItems",orderItemsSchema);

module.exports = OrderItems;