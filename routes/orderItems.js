const router =require("express").Router();
let OrderItem = require("../models/OrderItems");


//To add the maximum of three items to an unique order
router.route("/addOrderItems").post((req,res) => {

    const orderId = req.body.orderId;
    const productId1 = req.body.productId1;
    const productId2 = req.body.productId2;
    const productId3 = req.body.productId3;
    const qty1 = Number(req.body.qty1);
    const qty2 = Number(req.body.qty2);
    const qty3 = Number(req.body.qty3);
    const feature1 = req.body.feature1;
    const feature2 = req.body.feature2;
    const feature3 = req.body.feature3;

    const newOrderItem = new OrderItem ({
        orderId,productId1,qty1,feature1,productId2,qty2,feature2,productId3,qty3,feature3
    })

    /*if(productId1 != null && productId2 != null && productId3 != null){

        if(feature1 !=null && feature2 != null && feature3 != null){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1,productId2,qty2,feature2,productId3,qty3,feature3
            })
        }else if (feature1 !=null && feature2 != null && feature3 == null){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1,productId2,qty2,feature2,productId3,qty3
            })
        }else if(feature1 !=null && feature2 == null && feature3 == null){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1,productId2,qty2,productId3,qty3
            })
        }else{
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,productId2,qty2,productId3,qty3
            })
        }

    }else if(productId1 != null && productId2 != null && productId3 == null){
        if(feature1 !=null && feature2 != null ){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1,productId2,qty2,feature2
            })
        }else if(feature1 !=null && feature2 == null){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1,productId2,qty2
            })
        }else{
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,productId2,qty2
            })
        }

    }else if(productId1 != null && productId2 == null && productId3 == null){
        if(feature1 !=null ){
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1,feature1
            })
        }else{
            newOrderItem = new OrderItem ({
                orderId,productId1,qty1
            })
        }
    }*/

   
    newOrderItem.save().then(() =>{//pass the object to database if successful
        res.json("Products of the Order Added")//from jason format a response sent to front end
    }).catch((err) =>{//error or exception handling
        console.log(err);
        //res.status(300).send({status : "Error Order Insertion",error:err.message});
    })

})



//To retrieve the orderItems details of an unique order
router.route("/getOrderItem/:oID").get(async(req,res) => {

    let oID = req.params.oID;

   
    const orderItem = await OrderItem.findOne({orderId : oID})
    .then((orderItem) =>{
        res.status(200).send({status :"Order fetched", orderItem: orderItem})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status : "Error with get Order", error:err.message});
    })

})

//To delete an order by using the orderId
router.route("/deleteOrderItem/:oID").delete(async(req,res) =>{

    let oID = req.params.oID;

    
    await OrderItem.findOneAndDelete({orderId : oID})
    .then(() =>{
        res.status(200).send({status: "Order deleted"});
    }).catch(() => {
        console.log(err);
        res.status(500).send({status:"Error with delete order",error : err.message});
    })


})

router.route("/updatesOrderItem/:oID").put(async(req,res) => {

    let oID =req.params.oID;//unique orderId taken from the frontend

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {orderId,productId1,qty1,feature1,productId2,qty2,feature2,productId3,qty3,feature3} = req.body;//we call this as dStructure

    const updateOrderItem = {//create a object containing the data that needs to be updated
        orderId,productId1,qty1,feature1,productId2,qty2,feature2,productId3,qty3,feature3
    }

    //we have to pass the primary key and then value to be passed
    const update = await OrderItem.findOneAndUpdate({orderId:oID},updateOrderItem)
    .then(() => {
        res.status(200).send({status:"OrderItems updated"})//sending details of the updated data back to front end
     }).catch((err) =>{
         console.log(err);
         res.status(500).send({status: "Error with updating data",error: err.message});
     }) 

})

router.route("/displayOrderItems").get((req,res) => {

    OrderItem.find().then((orderItem) =>{
        res.json(orderItem)

    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;