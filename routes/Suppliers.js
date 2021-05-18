const router = require("express").Router();
let Supplier = require("../models/Supplier");

//http://localhost:8070/Supplier/add
//insert data

router.route("/adds").post((req,res)=>{

    const supp_id = req.body.supp_id;
    const supplier_name = req.body.supplier_name;
    const organization = req.body.organization;
    const address = req.body.address;
    const contact_number= req.body.contact_number;
    const email= req.body.email;
    const fax= req.body.fax;
    const credit_limit= Number(req.body.credit_limit);

    const newSupplier = new Supplier({

        supp_id,
        supplier_name,
        organization,
        address,
        contact_number,
        email,
        fax,
        credit_limit

    })

    newSupplier.save().then(()=>{
        //If insert success
        res.json("Supplier Added")
    }).catch((err)=>{
         //If it is unsuccessfull, display error on console
        console.log(err);
    })

}) 

//view data
router.route("/").get((req,res)=>{

    Supplier.find().then((Suppliers)=>{
        res.json(Suppliers)
    }).catch((err)=>{
        console.log(err)
    })
})

//http://localhost:8070/supplier/update
//update data

router.route("/updates/:supp_id").put(async(req,res)=>{

    let supplier_id = req.params.supp_id;
    const {supp_id,supplier_name, organization, address,contact_number,email,fax,credit_limit}= req.body;

    const updateSupplier = {
        supp_id,
        supplier_name,
        organization,
        address,
        contact_number,
        email,
        fax,
        credit_limit

    }

    //async is waiting for request or promise from await
    //await must be waiting for all updates are doing(help to async)
    const update = await Supplier.findOneAndUpdate({supp_id:supplier_id},updateSupplier).then((Supplier) =>{
        res.status(200).send({Suppliers : Supplier})

}).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message});

})

})

router.route("/delete/:id").delete(async(req,res)=>{
    let supplier_id = req.params.id;

    await Supplier.findOneAndDelete({supp_id : supplier_id}).then(() =>{
        res.status(200).send({status: "supplier deleted"});
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete supplier", error: err.message});
    })

})

router.route("/gets/:supp_id").get(async(req,res)=>{
    let supplier_id = req.params.supp_id;
    const supp = await Supplier.findOne({supp_id:supplier_id}).then((supplier_id) =>{

        res.status(200).send({suppliers : supplier_id})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user", error: err.message});

    })
})

module.exports = router;