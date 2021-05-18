const router =require("express").Router();
let Order = require("../models/Orders");

//To add the deatils for an unique order
router.route("/addOrder").post((req,res) => {

    const orderId = req.body.orderId;
    const cNIC = req.body.cNIC;
    const type = req.body.type;
    const oDate =req.body.oDate;
    const dAddress = req.body.dAddress;
    const additonalCharge = Number(req.body.additonalCharge);
    const finalPrice = Number(req.body.finalPrice);
    const oStatus =req.body.oStatus;
    const oEmpId = req.body.oEmpId;


    const newOrder = new Order({
        orderId,
        cNIC,
        type,
        oDate,
        dAddress,
        additonalCharge,
        finalPrice,
        oStatus,
        oEmpId

    })

    newOrder.save().then(() =>{//pass the object to database if successful
        //res.json("Order Added")//from jason format a response sent to front end
        res.status(200).send({message:"Order Added"})
    }).catch((err) =>{//error or exception handling
        //console.log(err);
        res.status(300).send({status : "Error Order Insertion",error:err.message});
    })

})

//To retrieve all the order details in database
router.route("/displayOrders").get((req,res) => {

        Order.find().then((order) =>{
            res.json(order)

        }).catch((err)=>{
            console.log(err);
        })
})


//To retrieve the order details of a specific order 
router.route("/getOrder/:oID").get(async(req,res) => {

    let oID = req.params.oID;//order id taken from front end

    const order = await Order.findOne({orderId : oID})
    .then((order) =>{
        res.status(200).send({status :"Order fetched", order:order})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status : "Error with get Order", error:err.message});
    })

})


//To delete a specific order from database
router.route("/deleteOrder/:oID").delete(async(req,res) =>{

    let oID = req.params.oID;//order id taken from frontend

    await Order.findOneAndDelete({orderId : oID})
    .then(() =>{
        res.status(200).send({status: "Order deleted"});
    }).catch(() => {
        console.log(err);
        res.status(500).send({status:"Error with delete order",error : err.message});
    })


})


//To update the order deails
router.route("/updates/:oID").put(async(req,res) => {

    let oID =req.params.oID;//orderId taken from the frontend

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {orderId,cNIC,type,oDate,dAddress,additonalCharge,finalPrice,oStatus,oEmpId} = req.body;//we call this as dStructure

    const updateOrder = {//create a object containing the data that needs to be updated
            orderId,
            cNIC,
            type,
            oDate,
            dAddress,
            additonalCharge,
            finalPrice,
            oStatus,
            oEmpId
    }

    //we have to pass the primary key and then value to be passed
    const update = await Order.findOneAndUpdate({orderId:oID},updateOrder)
    .then(() => {
        res.status(200).send({status:"Order updated"})//sending details of the updated data back to front end
     }).catch((err) =>{
         console.log(err);
         res.status(500).send({status: "Error with updating data",error: err.message});
     }) 

})

//this route is used to find the last added order details
router.route("/getLatestOrder").get(async(req,res) => {

    const order = await Order.find().sort({_id : -1}).limit(1)
    .then((order) =>{
        res.status(200).send({status :"Order fetched", order: order})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status : "Error with get Order", error:err.message});
    })

})

//To get the count of the pending orders
router.route("/completedOrderCount").get((req,res) => {

     Order.find({oStatus: /pending/}).count().then((result) =>{
        res.json(result);

    }).catch((err)=>{
        console.log(err);
    })

})

//this will serach for the list of orders by a particular customer nic given at searchbox
router.route("/searchOrders/:nic").get((req,res) => {

    let val =req.params.nic.trim();
 
     //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Order.find({cNIC:{$regex: "^" + val + ".*", $options:'i'} } ).then((orders) =>{
         res.json(orders);
         
     })
     .catch((err)=>{
         console.log(err);
         
     })
  
 
 })

//to search for an order or orders by giving orderId in search box 
router.route("/searchOrdersByOrderId/:oId").get((req,res) => {

    let val =req.params.oId.trim();
 
     //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining
     Order.find({orderId :{$regex: ".*" + val + ".*", $options:'i'}}).then((orders) =>{
         res.json(orders)
 
     }).catch((err)=>{
         console.log(err);
     })
 
 })


 router.route("/createOrderReport/:sDate/:fDate/:status").get((req,res) => {

    let val1 =req.params.sDate.trim();
    let val2 =req.params.fDate.trim();
    let val3 =req.params.status.trim();

    let val4 = val1.substring(2,6);
    let val5 = val2.substring(2,6);
 
     //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Order.find({$or:[{ oDate :{$regex: ".*" + val4 + ".*"}, oDate:{$regex: ".*" + val5 + ".*"}}], oStatus: {$regex: ".*" + val3 + ".*"}} ).then((orders) =>{
         res.json(orders);
         
     })
     .catch((err)=>{
         console.log(err);
         
     })
  
 
 })


module.exports = router;