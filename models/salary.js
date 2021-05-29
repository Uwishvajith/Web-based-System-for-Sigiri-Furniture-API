/**This file contains database implementation of salary
owned by IT19965550
Walpola S.R.
*/
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    
//attrubutes in database
    EmpId:{
        type:String,
        required:true
    },
    Leaves:{
        type:Number,
    },
    Salary:{
        type:String,
    }
});

module.exports = mongoose.model('sal',postSchema);