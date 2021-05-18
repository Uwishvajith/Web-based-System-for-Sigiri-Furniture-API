const router = require("express").Router();

let Product = require("../Models/product");

http://localhost:8060/products/add

router.route("/add").post((req,res) => {

    //Add product data to the database 
    const  id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const qty = Number(req.body.qty);

    //create new product variable
    const newProduct = new Product({

        id,
        name,
        type,
        price,
        qty
    })

    //save product data to the database and show success or unsuccess message
    newProduct.save(function(error, result) {
        if (error) {
            res.status(500).send({status: 'Product not Added!', error: error.message});
        } else {
            if (result) {
                res.status(200).send({status: 'New product added Successfully!'});
            } else {
                res.status(500).send({status: 'Product not Added!'});
            }
        }
    });

    

})


//exporting module
module.exports = router;