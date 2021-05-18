const router = require("express").Router();
let Tender = require("../models/Tender");

//http://localhost:8070/Tender/add
//insert data

router.route("/add").post((req,res)=>{

    const tenderid = req.body.tenderid;
    const supp_id = req.body.supp_id;
    const itemcode = req.body.itemcode;
    const type= req.body.type;
    const description= req.body.description;
    const quantity= Number(req.body.quantity);
   

    const newTender = new Tender({

        tenderid,
        supp_id,
        itemcode,
        type,
        description,
        quantity
       

    })

   newTender.save().then(()=>{
        //If insert success
        res.json("Tender Quotation Added")
    }).catch((err)=>{
         //If it is unsuccessfull, display error on console
        console.log(err);
    })

}) 

//view data
router.route("/").get((req,res)=>{

    Tender.find().then((Tenders)=>{
        res.json(Tenders)
    }).catch((err)=>{
        console.log(err)
    })
})

//http://localhost:8070/Tender/update
//update data

router.route("/update/:tenderid").put(async(req,res)=>{

    let tid = req.params.tenderid;
    const {tenderid,supp_id, itemcode,type,description,quantity}= req.body;

    const updateTender = {
        tenderid,
        supp_id,
        itemcode,
        type,
        description,
        quantity
       

    }

    //async is waiting for request or promise from await
    //await must be waiting for all updates are doing(help to async)
    const update = await Tender.findOneAndUpdate({tenderid:tid},updateTender).then((Tender) =>{
        res.status(200).send({Tenders : Tender})

}).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message});

})

})

router.route("/delete/:id").delete(async(req,res)=>{
    let tid = req.params.id;

    await Tender.findOneAndDelete({tenderid : tid}).then(() =>{
        res.status(200).send({status: "Tender Quotation deleted"});
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete supplier", error: err.message});
    })

})

router.route("/get/:tenderid").get(async(req,res)=>{
    let tid = req.params.tenderid;
    const tedd = await Tender.findOne({tenderid:tid}).then((tid) =>{

        res.status(200).send({Tenders : tid})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user", error: err.message});

    })
})

module.exports = router;