/**This file contains CRUD operation implementation for payments page
owned by IT19965550
Walpola S.R.
*/
const express = require('express');
const payments = require('../models/payments');
const router = express.Router();

//saving the post - create
router.post('/payments/save',(req,res)=>{

    let payment_type = new payments(req.body);

    payment_type.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"payment details saved successfully"
        });
    });
});

//retrieve data - get 
router.route("/payments").get((req,res) => {

    payments.find().then((payments) => {
        res.json(payments)
    }).catch((err) => {
        console.log(err)
    })
})

//updating payments - update
router.put('/payments/update/:id',(req,res) =>{
    payments.findByIdAndUpdate(
        req.params.id,
       {
           $set:req.body
       },
       (err,post)=>{
           if(err){
               return res.status(400).json({error:err});
           }
           return res.status(200).json({
               success:"Updated Successfully"
           });
       });
});

//remove data - delete
router.route("/payments/delete/:id").delete(async (req,res) => {

    const del = req.params.id ;

await payments.findByIdAndRemove(del,function(error, result) {
    if (error) {
        res.status(500).send({status: 'Error 01'});
    } else {
        if (result) {
            res.status(200).send({status: 'Deleted Successfully!'});
        } else {
            res.status(500).send({status: 'Delete Faild!'});
        }
    }
})
})

module.exports = router;