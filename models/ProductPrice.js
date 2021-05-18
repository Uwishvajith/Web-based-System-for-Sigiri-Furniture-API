const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productpriceSchema = new Schema({

    salesid : {
        type : String,
        required : true,
        unique : true
    },
    productid : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    starting_date : {
        
    },
    clossing_date : {
        
    },
    discount : {
        type : Number,
        
    },
    price : {
        type : Number,
        
    },
    discountprice : {
        type : Number,
       
        
    },
    newprice : {
        type : Number,
        
        
    },
    quentity : {
        type : Number,
        required : true
        
    }

})

//all the data assign to mongo db ("promotion") database collection name, it may be simple or capitala but this name save in mongodb in simple letter only and plural promotions
const ProductPrice = mongoose.model("ProductPrice", productpriceSchema);

module.exports = ProductPrice;
