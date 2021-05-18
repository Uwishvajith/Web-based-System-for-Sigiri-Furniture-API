const router = require("express").Router();
let Promotion = require("../models/Promotion");

//insert data
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

    newPromotion.save().then(()=>{
         // If insert success
        res.json("Promotion Added")
    }).catch((err)=>{
        //If it is unsuccessfull, display error on console
        console.log(err);
        res.status(400).send({status:"You can't enter same promotion id",err});
    })

})

//View data
router.route("/").get((req,res)=>{
    Promotion.find().then((promotions)=>{
        res.json(promotions)
    }).catch((err)=>{
        console.log(err)
    })
})

//update data
router.route("/update/:promotionid").put(async(req, res)=>{
    let promoId = req.params.promotionid;//params mean parameter fetch promotion Id 
    //D-structure
    const{promotionid, productid, category, starting_date, clossing_date, description, media, budget, status} = req.body;
    
    const updatePromotion = {
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

router.route("/delete/:promotionid").delete(async(req,res)=>{
    let promoId = req.params.promotionid;
    await Promotion.findOneAndDelete({promotionid:promoId}).then((promotion)=>{
        res.status(200).send({status : "Promotion deleted"});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

router.route("/get/:promotionid").get(async (req,res)=>{
    let promoId = req.params.promotionid;
    const promo = await Promotion.findOne({promotionid:promoId}).then((promotion)=>{
        res.status(200).send({promotions : promotion})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

router.route("/searchPromotionByID/:promotionid").get((req,res)=>{
    let proid = req.params.promotionid.trim();

    Promotion.find({promotionid:{$regex: ".*" + proid + ".*" , $options:'i'}}).then((promotion)=>{
        res.json(promotion)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;

