const router = require("express").Router();
let Vehicle =require("../models/vehicle");

//add vehicles
router.route("/add").post((req,res)=>{

    console.log(req.body);

    const VehicleID =req.body.VehicleID;
    const VehicleRegNo =req.body.VehicleRegNo;
    const Date = req.body.Date;
    const VehicleType=req.body.VehicleType;
    const VehicleBrand=req.body.VehicleBrand;
    const Mileage = Number(req.body.Mileage);

    const newVehicle = new Vehicle({
        VehicleID,
        VehicleRegNo,
        Date,
        VehicleType,
        VehicleBrand,
        Mileage
    })

    newVehicle.save().then(()=>{
        res.json("Vehicle added");

    }).catch((err)=>{
        console.log(err);
    })

})

//view data
router.route("/").get((req,res)=>{
        Vehicle.find().then((Vehicles)=>{
                res.json(Vehicles)
        }).catch((err)=>{
            console.log(err)
        })
})


//update
router.route("/update/:id").put(async(req,res)=>{

    let userId = req.params.id;
    const { VehicleID,VehicleRegNo,Date,VehicleType,VehicleBrand,Mileage} =req.body;

    //const data = req.body;
    //D structure
    const updateVehicle ={
         VehicleID,VehicleRegNo,Date,VehicleType,VehicleBrand,Mileage
    }

    const update = await Vehicle.findOneAndUpdate({VehicleID:userId},updateVehicle).then(()=>{

        res.status(200).send({status: "Vehicle Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Errror with updating data"})
    })

    
})


//delete
router.route("/delete/:id").delete(async(req,res)=>{

    let userId = req.params.id;

    await Vehicle.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Vehicle deleted"})
        
        }).catch((errr)=>{
            console.log(err.message);
            res.status(500).send({status: "Error with delete"});
    })
})

 //geting data of one user

 router.route("/get/:id").get(async(req,res)=>{
     let userId=req.params.id;

     const user = await Vehicle.findById(userId)
     .then((vehicle)=>{
         res.status("200").send({status: "Data Fetched", vehicle})
     }).catch(()=>{
         console.log(err.message);
         res.status(500).send({status:"Error with data", error: err.message});
     })
 })

module.exports = router;