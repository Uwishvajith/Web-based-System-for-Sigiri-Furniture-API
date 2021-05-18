const router = require("express").Router();

let Product = require("../Models/product");




//delete product

http://localhost:8060/products/delete/productId

router.route("/delete/:productId").delete(async (req,res) => {

    const del = {id : req.params.productId}

    await Product.findOneAndDelete(del,function(error, result) {
        if (error) {
            res.status(500).send({status: 'Delete Faild!'});
        } else {
            if (result) {
                res.status(200).send({status: 'Deleted Successfully!'});
            } else {
                res.status(500).send({status: 'Delete Faild!'});
            }
        }
    })
})


//exporting module
module.exports = router;
