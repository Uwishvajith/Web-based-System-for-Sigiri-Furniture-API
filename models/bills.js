/**This file contains database implementation of bills
owned by IT19965550
Walpola S.R.
*/


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
//attrubutes in database
    BillType:{
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

module.exports = mongoose.model('bill',postSchema);