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

//delete Transport data
router.route("/deleteM/:id").delete(async(req,res)=>{

    let userId = req.params.id;

    await Maintenance.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Maintenace Details deleted"})
        
        }).catch((errr)=>{
            console.log(err.message);
            res.status(500).send({status: "Error with delete"});
    })
})



module.exports = router;