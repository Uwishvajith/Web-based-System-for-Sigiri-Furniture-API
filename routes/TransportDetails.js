const router = require("express").Router();
const TransportDetail = require("../models/TransportDetail");


//Add Transport Details

router.route("/addT").post((req,res)=>{

    console.log(req.body);

    const TransportID = req.body.TransportID;
    const VehicleRegNo = req.body.VehicleRegNo;
    const Date = req.body.Date;
    const DriverName = req.body.DriverName;
    const Discription = req.body.Discription;
    const Status = req.body.Status;


    const newTransportDetail = new TransportDetail({
        TransportID,
        VehicleRegNo,
        Date,
        DriverName,
        Discription,
        Status

    })

    newTransportDetail.save().then(()=>{
        res.json("Transport Details Added");
    }).catch((err)=>{
        console.log(err);
    })

})


//view Transport Details


router.route("/ViewT").get((req,res)=>{
    TransportDetail.find().then((TransportDetails)=>{
        res.json(TransportDetails)
    }).catch((err)=>{
        console.log(err)
    })
})


//Update Transport Details
router.route("/updateT/:id").put(async(req,res)=>{

    let userId = req.params.id;
    const { TransportID,VehicleRegNo,Date,DriverName,Discription,Status} =req.body;

    console.log("va;ueeeeeeeeeeeeeeeeee",req.body.Status);

    //const data = req.body;
    //D structure
    const updateTransport ={
        TransportID,VehicleRegNo,Date,DriverName,Discription,Status
    }

    const update = await TransportDetail.findOneAndUpdate({TransportID:userId},updateTransport).then(()=>{

        res.status(200).send({status: "Transport Details Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with updating data"})
    })

    
})


//delete Transport data
router.route("/deleteT/:id").delete(async(req,res)=>{

    let userId = req.params.id;

    await TransportDetail.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Transport Detail deleted"})
        
        }).catch((errr)=>{
            console.log(err.message);
            res.status(500).send({status: "Error with delete"});
    })
})




module.exports = router;