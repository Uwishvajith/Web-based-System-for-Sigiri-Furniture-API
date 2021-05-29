const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

    FirstName : {
        type : String,
        required : true,
        
    },

    LastName : {
        type : String,
        required : true,
        
    },

    eMail : {
        type : String,
        required : true,
        
    },
    
    
    NIC :{
        type : String,
        required:true
    },

    DOB : {
        type : String,
        required : true,
        
    },
    
    Age : {
        type : String,
        required : true,
        
    },
    
    Gender : {
        type : String,
        required : true,
        
    },

    MaritalStatus :{
        type : String,
        required :true
    },

    CurrentAddress :{
        type : String,
        required : true
    },

    PermanentAddress : {
        type : String,
        required : true,
        
    },

    MobileNumber :{
        type : String,
        required :true
    },

    LandLineNumber :{
        type : String,
        required : true
    },

    EmergencyContact :{
        type : String,
        required :true
    },

    Designation :{
        type : String,
        required : true
    },

    Department : {
        type : String,
        required : true,
        
    },

    JoinedDate :{
        type : String,
        required :true
    },

    PreviouslyWorkedCompany :{
        type : String,
        required : true
    },

    
    YearsOfExperiance : {
        type : String,
        required : true,
        
    },

    EmployeePicture :{
        type : String,
        required :true
    },

    CV :{
        type : String,
        required : true
    },
    

    userId: {
        type : String,
        required : true
    }


})

const Employee = mongoose.model("Employee",EmployeeSchema);

module.exports = Employee;
