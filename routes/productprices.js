const router = require("express").Router();
let ProductPrice = require("../models/ProductPrice");

//insert data for an unique order
router.route("/addadd").post((req,res)=>{

    const salesid = req.body.salesid;
    const productid = req.body.productid;
    const category = req.body.category;
    const starting_date = req.body.starting_date;
    const clossing_date = req.body.clossing_date;
    const discount = Number(req.body.discount);
    const price = Number(req.body.price);
    const discountprice = Number(req.body.discountprice);
    const newprice = Number(req.body.newprice);
    const quentity = Number(req.body.quentity);


    const newProductPrice = new ProductPrice({

            salesid,
            productid,
            category,
            starting_date,
            clossing_date,
            discount,
            price,
            discountprice,
            newprice,
            quentity
    })

    newProductPrice.save().then(()=>{//pass the object to database if successfull
         //res.json("product price Added")//from jason format a response sent to front end
        res.json("Product Prices Added")
    }).catch((err)=>{//error or exception handling
        //If it is unsuccessfull, display error on console
        console.log(err);
        res.status(400).send({status:"You can't enter same sales id",error:err.message});
    })

})

//View data all the product price details in database
router.route("/getproductprice").get((req,res)=>{
    ProductPrice.find().then((productprices)=>{
        res.json(productprices)
    }).catch((err)=>{
        console.log(err)
    })
})

//update data
router.route("/updateupdate/:salesid").put(async(req, res)=>{
    let productpriceId = req.params.salesid;//salesId taken from the frontend 
    //D-structure
    const{salesid,productid, category,starting_date,clossing_date, discount,price, discountprice, newprice, quentity} = req.body;
    
    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const updateProductPrice = {//create a object containing the data that needs to be updated
            salesid,
            productid,
            category,
            starting_date,
            clossing_date,
            discount,
            price,
            discountprice,
            newprice,
            quentity
    }

    //async is waiting for request or promise from await
    //await must be waiting for all updates are doing(help to async)
    const updateupdate = await ProductPrice.findOneAndUpdate({salesid:productpriceId}, updateProductPrice).then((productprice)=>{

        res.status(200).send({status : "Product Prices updated"})//sending details of the updated data back to front end

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message});
    })  

})

//to delete a product prices from database 
router.route("/deletedelete/:salesid").delete(async(req,res)=>{
    let productpriceId = req.params.salesid;//sales id taken from frontend
    await ProductPrice.findOneAndDelete({salesid:productpriceId}).then((productprice)=>{
        res.status(200).send({status : "Product Price deleted"});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

//retrieve one record from databse
router.route("/getget/:salesid").get(async (req,res)=>{
    let productpriceId = req.params.salesid;
    const product = await ProductPrice.findOne({salesid:productpriceId}).then((productprice)=>{
        res.status(200).send({productprices:productprice})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get Product price ", error: err.message});
    })
})

//this will serach for the sales id by a particular product price given at searchbox
router.route("/searchProductByID/:salesid").get((req,res)=>{
    let salid = req.params.salesid.trim();

    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    ProductPrice.find({salesid:{$regex: ".*" + salid + ".*" , $options:'i'}}).then((productprice)=>{
        res.json(productprice)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;

