const router = require("express").Router();
let ProductPrice = require("../models/ProductPrice");

//insert data
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

    newProductPrice.save().then(()=>{
         // If insert success
        res.json("Product Prices Added")
    }).catch((err)=>{
        //If it is unsuccessfull, display error on console
        console.log(err);
    })

})

//View data
router.route("/getproductprice").get((req,res)=>{
    ProductPrice.find().then((productprices)=>{
        res.json(productprices)
    }).catch((err)=>{
        console.log(err)
    })
})

//update data
router.route("/updateupdate/:salesid").put(async(req, res)=>{
    let productpriceId = req.params.salesid;//params mean parameter fetch promotion Id 
    //D-structure
    const{salesid,productid, category,starting_date,clossing_date, discount,price, discountprice, newprice, quentity} = req.body;
    
    const updateProductPrice = {
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

        res.status(200).send({status : "Product Prices updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message});
    })  

})

router.route("/deletedelete/:salesid").delete(async(req,res)=>{
    let productpriceId = req.params.salesid;
    await ProductPrice.findOneAndDelete({salesid:productpriceId}).then((productprice)=>{
        res.status(200).send({status : "Product Price deleted"});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

router.route("/getget/:salesid").get(async (req,res)=>{
    let productpriceId = req.params.salesid;
    const product = await ProductPrice.findOne({salesid:productpriceId}).then((productprice)=>{
        res.status(200).send({productprices:productprice})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get Product price ", error: err.message});
    })
})

router.route("/searchProductByID/:salesid").get((req,res)=>{
    let salid = req.params.salesid.trim();

    ProductPrice.find({salesid:{$regex: ".*" + salid + ".*" , $options:'i'}}).then((productprice)=>{
        res.json(productprice)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;

