const router = require("express").Router();
const Maintenance = require("../models/Maintenance");






//add Maintenance details
router.route("/addM").post((req,res)=>{

    console.log(req.body);

    const MaintainID =req.body.MaintainID;
    const VehicleRegNo =req.body.VehicleRegNo;
    const Date = req.body.Date;
    const Discription=req.body.Discription;
    const Cost=req.body.Cost;
    

    const newMaintenance = new Maintenance({
        MaintainID,
        VehicleRegNo,
        Date,
        Discription,
        Cost
    
    })

    newMaintenance.save().then(()=>{
        res.json("Maintenance details added");

    }).catch((err)=>{
        console.log(err);
    })

})

//view Maintenance data
router.route("/viewM").get((req,res)=>{
    Maintenance.find().then((Maintenances)=>{
            res.json(Maintenances)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;