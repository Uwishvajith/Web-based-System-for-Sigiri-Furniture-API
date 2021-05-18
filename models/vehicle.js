const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    VehicleID : {
        type : String,
        required : true
    },

    VehicleRegNo : {
        type : String,
        required : true
    },

    Date :{
        type : String,
        required:true
    },

    VehicleType :{
        type : String,
        required :true
    },

    VehicleBrand :{
        type : String,
        required : true
    },

    Mileage : {
        type : Number,
        required : true
    }


})

const Vehicle = mongoose.model("Vehicle",vehicleSchema);

module.exports = Vehicle;
