/**This file contains database implementation of payments
owned by IT19965550
Walpola S.R.
*/


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
//attrubutes in database
    Description:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('payment',postSchema);