const router = require("express").Router();
const Employee = require("../models/Driver");


//view data



router.route("/viewD").get(async(req,res)=>{
        const s = 'employee management'
        const regex = new RegExp(s, 'i') // i for case insensitive
        Employee.find({Designation: {$regex: regex}})
    .then((Drivers)=>{
        res.status("200").send({status: "Data Fetched", Drivers})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with data", error: err.message});
    })
})

module.exports = router;