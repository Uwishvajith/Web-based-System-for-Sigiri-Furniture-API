const router = require("express").Router();
const Employee = require("../models/Driver");


//View All Drivers data 



router.route("/viewD").get(async(req,res)=>{
        const s = 'Driver'
        const regex = new RegExp(s, 'i') // i for case insensitive
        Employee.find({Designation: {$regex: regex}})//find by designation = Driver
    .then((Drivers)=>{
        res.json({Drivers})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with data", error: err.message});
    })
})

module.exports = router;