/**This file contains CRUD operation implementation for bills page
owned by IT19965550
Walpola S.R.
*/
const express = require('express');
const bills = require('../models/bills');
const router = express.Router();

//saving the post - create
router.post('/bills/save',(req,res)=>{

    let bill_type = new bills(req.body);

    bill_type.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"bill details saved successfully"
        });
    });
});

//retrieve data - get 
router.route("/bills").get((req,res) => {

    bills.find().then((bills) => {
        res.json(bills)
    }).catch((err) => {
        console.log(err)
    })
})

//updating bills - update
router.put('/bills/update/:id',(req,res) =>{
    bills.findByIdAndUpdate(
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
router.route("/bills/delete/:id").delete(async (req,res) => {

        const del = req.params.id ;

    await bills.findByIdAndRemove(del,function(error, result) {
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