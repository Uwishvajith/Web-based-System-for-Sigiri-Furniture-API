/**This file contains database implementation of ledger
owned by IT19965550
Walpola S.R.
*/
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    
//attrubutes in database
    OrderId:{
        type:String,
        
    },
    Date:{
        type:String,
        
    },
    Amount:{
        type:Number,
        
    },

    lDate:{
        type:String,
    },

    Description:{
        type:String,
    },

    lAmount:{
        type:Number,
    }
});

module.exports = mongoose.model('ledger',postSchema);