const router = require("express").Router();

let Product = require("../Models/product");


http://localhost:8060/products


//Read product data


router.route("/view").get((req,res) => {

    Product.find().then((products) => {
        res.json(products)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;