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
        type: Number,
        required:true
    },
    

    email:{
        type: String,
        required:true
    },


    fax:{
        type:Number,
        required:true
    },

    credit_limit:{
        type:Number,
        required:true
    }


})

//all the data assign to mongo db ("supplier") database collection name, it may be simple or capitala but this name save in mongodb in simple letter only and plural suppliers
const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports=Supplier;

