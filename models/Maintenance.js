const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({

    MaintainID : {
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

    Discription :{
        type: String,
        required :true
    },

    Cost :{
        type : String,
        required : true
    }

})

const Maintenance = mongoose.model("Maintenance",MaintenanceSchema);

module.exports = Maintenance;
