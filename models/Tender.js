const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tenderSchema = new Schema({

    tenderid :{
        type: String,
        required: true,
        unique: true
    },

    supp_id :{
        type: String,
        required: true
    },


    itemcode :{
        type : String,
        required: true
    },

    
    type :{
        type :String,
        required:true
    },

    description:{
        type: String,
        required:true
    },

    quantity:{
        type: Number,
        required:true
    }


})

//all the data assign to mongo db ("tender") database collection name, it may be simple or capitala but this name save in mongodb in simple letter only and plural tenders
const Tender = mongoose.model("Tender",tenderSchema);

module.exports=Tender;

