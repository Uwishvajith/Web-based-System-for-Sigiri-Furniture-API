const router = require("express").Router();

let Product = require("../Models/product");

http://localhost:8060/products/update/s001

//Update selected product details
router.route("/update/:productId").put(async (req,res) => {

   const filter = {id : req.params.productId}

    //d structure
    const {name, type,price, qty} = req.body;

    //create an object to the prodcut need to update
    const updateProduct = {
        name,
        type,
        price,
        qty
    }
    options = {new: true};

    const Update = await Product.findOneAndUpdate(filter, updateProduct, options, function(error, result) {
    if (error) {
		res.status(500).send({status: 'Update Faild!'});
	} else {
		if (result) {
			res.status(200).send({status: 'Updated Successfully!'});
		} else {
			res.status(500).send({status: 'Update Faild!'});
		}
	}
})
})

module.exports = router;