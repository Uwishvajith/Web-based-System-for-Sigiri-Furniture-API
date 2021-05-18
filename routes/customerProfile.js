const router =require("express").Router();
let Customer = require("../models/CustomerProfile");

//Customer profile creation with an unique NIC 
router.route("/add").post((req,res) => {

    const NIC = req.body.NIC;
    const name = req.body.name;
    const organization = req.body.organization;
    const address =req.body.address;
    const contactNo = Number(req.body.contactNo);
    const email = req.body.email;
    const regDate =req.body.regDate;
    const empId = req.body.empId;


    const newCustomer = new Customer({

        NIC,
        name,
        organization,
        address,
        contactNo,
        email,
        regDate,
        empId

    })

    newCustomer.save().then(() =>{//pass the object to database if successful
        res.status(200).send({message:"Customer Added"})//from jason format a response sent to front end
    }).catch((err) =>{//error or exception handling
        console.log(err);
        res.status(300).send({status : "Error with insert user",error:err.message});

    })

})

//Retrieve all Customer profiles
router.route("/").get((req,res) => {

        Customer.find().then((customers) =>{
            res.json(customers)

        }).catch((err)=>{
            console.log(err);
        })
})

//Retrieve one customer profile using nic
router.route("/get/:nic").get(async(req,res) => {

    let NIC = req.params.nic;//nic taken from frontend

    const customer = await Customer.findOne({NIC : NIC})
    .then((customer) =>{
        res.status(200).send({status :"User fetched",customer:customer})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status : "Error with get user", error:err.message});
    })

})

//Delete one customer profile using nic
router.route("/delete/:nic").delete(async(req,res) =>{

    let NIC = req.params.nic;//nic taken from frontend

    await Customer.findOneAndDelete({NIC : NIC})
    .then(() =>{
        res.status(200).send({status: "Customer deleted"});
    }).catch(() => {
        console.log(err);
        res.status(500).send({status:"Error with delete user",error : err.message});
    })


})


//can use post here as well
//Update customer profile details
router.route("/update/:id").put(async(req,res) => {

    let userId =req.params.id;//take that unique id of the module that is created automatically,parms means parameter

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {NIC,name,organization,address,contactNo,email,regDate,empId} = req.body;//we call this as dStructure

    const updateCustomer = {//create a object containing the data that needs to be updated
            NIC,
            name,
            organization,
            address,
            contactNo,
            email,
            regDate,
            empId
    }

    //we have to pass the primary key and then value to be passed
    const update = await Customer.findByIdAndUpdate(userId,updateCustomer)
    .then(() => {
        res.status(200).send({status:"Customer updated"})//sending details of the updated data back to front end
     }).catch((err) =>{
         console.log(err);
         res.status(500).send({status: "Error with updating data",error: err.message});
     }) 

})

//Update the customer table by using unique nic
router.route("/updates/:nic").put(async(req,res) => {

    let NICid =req.params.nic;//using the frontend passed nic

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {NIC,name,organization,address,contactNo,email,regDate,empId} = req.body;//we call this as dStructure

    const updateCustomer = {//create a object containing the data that needs to be updated
            NIC,
            name,
            organization,
            address,
            contactNo,
            email,
            regDate,
            empId
    }

    //we have to pass the primary key and then value to be passed
    const update = await Customer.findOneAndUpdate({NIC:NICid},updateCustomer)
    .then(() => {
        res.status(200).send({status:"Customer updated"})//sending details of the updated data back to front end
     }).catch((err) =>{
         console.log(err);
         //res.status(300).send({status: "Error with updating data",error: err.message});
         res.status(301).send({status : "Error with get user",error:err.codeName});
     }) 

})

//To search for list of customers from NIC Value
router.route("/searchCustomer/:nic").get((req,res) => {

   let val =req.params.nic.trim();

    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Customer.find({NIC:{$regex: "^" + val + ".*", $options:'i'} } ).then((customers) =>{
        res.json(customers);
        
    })
    .catch((err)=>{
        console.log(err);
        res.status(301).send({status : "Error with get user",error:err.message});
    })
 

})


//To search for list of customers from name Value
router.route("/searchCustomerByName/:name").get((req,res) => {

    let val =req.params.name.trim();
 
     //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining
     Customer.find({name :{$regex: ".*" + val + ".*", $options:'i'}}).then((customers) =>{
         res.json(customers)
 
     }).catch((err)=>{
         console.log(err);
     })
 
 })

module.exports = router;