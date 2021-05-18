const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promotionSchema = new Schema({

    promotionid : {
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
    description : {
        type : String,
        required : true
    },
    media : {
        type : String,
        required : true
    },
    budget : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        
    }

})

//all the data assign to mongo db ("promotion") database collection name, it may be simple or capitala but this name save in mongodb in simple letter only and plural promotions
const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
