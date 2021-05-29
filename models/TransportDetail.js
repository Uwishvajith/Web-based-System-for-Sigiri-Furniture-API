const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransportDetailSchema = new Schema({

    TransportID : {
        type : String,
        required : true,
        unique: true
    },

    VehicleRegNo : {
        type : String,
        required : true
    },

    Date :{
        type : String,
        required:true
    },

    DriverName : {
        type :String,
        required : true
    },

    Discription :{
        type: String,
        required :true
    },

    Status :{
        type : String,
        required : true
    }

})

const TransportDetail = mongoose.model("TransportDetail",TransportDetailSchema);

module.exports = TransportDetail;

