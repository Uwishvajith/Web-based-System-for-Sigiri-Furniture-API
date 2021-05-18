const router = require("express").Router();
let Promotion = require("../models/Promotion");

//insert data for an unique order
router.route("/add").post((req,res)=>{

    const promotionid = req.body.promotionid;
    const productid = req.body.productid;
    const category = req.body.category;
    const starting_date = req.body.starting_date;
    const clossing_date = req.body.clossing_date;
    const description = req.body.description;
    const media = req.body.media;
    const budget = Number(req.body.budget);
    const status = req.body.status;


    const newPromotion = new Promotion({

            promotionid,
            productid,
            category,
            starting_date,
            clossing_date,
            description,
            media,
            budget,
            status
    })

    newPromotion.save().then(()=>{//pass the object to database if successfull
         // If insert success
        res.json("Promotion Added")//res.json("promotion Added")//from jason format a response sent to front end
    }).catch((err)=>{//error or exception handling
        //If it is unsuccessfull, display error on console
        console.log(err);
      res.status(400).send({status:"You can't enter same promotion id",error:err.message});
    })

})

//View data all the promotion details in database
router.route("/").get((req,res)=>{
    Promotion.find().then((promotions)=>{
        res.json(promotions)
    }).catch((err)=>{
        console.log(err)
    })
})

//update data
router.route("/update/:promotionid").put(async(req, res)=>{
    let promoId = req.params.promotionid;//orderId taken from the frontend 
    //D-structure
    const{promotionid, productid, category, starting_date, clossing_date, description, media, budget, status} = req.body;
    
    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const updatePromotion = {//create a object containing the data that needs to be updated
        promotionid,
        productid,
        category,
        starting_date,
        clossing_date,
        description,
        media,
        budget,
        status
    }

    //async is waiting for request or promise from await
    //await must be waiting for all updates are doing(help to async)
    const update = await Promotion.findOneAndUpdate({promotionid :promoId}, updatePromotion).then((promotion)=>{

        res.status(200).send({status : "Promotion updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message});
    })  

})

//to delete a promotion from database 
router.route("/delete/:promotionid").delete(async(req,res)=>{
    let promoId = req.params.promotionid;//promotion id taken from frontend
    await Promotion.findOneAndDelete({promotionid:promoId}).then((promotion)=>{
        res.status(200).send({status : "Promotion deleted"});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

//retieve one record from database
router.route("/get/:promotionid").get(async (req,res)=>{
    let promoId = req.params.promotionid;
    const promo = await Promotion.findOne({promotionid:promoId}).then((promotion)=>{
        res.status(200).send({promotions : promotion})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

//this will serach for the sales id by a particular product price given at searchbox
router.route("/searchPromotionByID/:promotionid").get((req,res)=>{
    let proid = req.params.promotionid.trim();

    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Promotion.find({promotionid:{$regex: ".*" + proid + ".*" , $options:'i'}}).then((promotion)=>{
        res.json(promotion)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;

