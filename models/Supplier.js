const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    supp_id :{
        type: String,
        required: true,
        unique: true
    },

    supplier_name :{
        type : String,
        required: true
    },

    organization :{
        type : String,
        required:true
    },

    address :{
        type :String,
        required:true
    },



    contact_number:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true
    },

    fax:{
        type:String,
        required:true
    },

    credit_limit:{
        type:Number,
        required:true
    }


})

//all the data assign to mongo db ("promotion") database collection name, it may be simple or capitala but this name save in mongodb in simple letter only and plural promotions
const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports=Supplier;
