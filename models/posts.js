 /**This file contains database implementation of dailyincome
 owned by IT19965550
 Walpola S.R.
 */

 const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
//attrubutes in database
    OrderId:{
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

 module.exports = mongoose.model('income',postSchema);//collection name = first param