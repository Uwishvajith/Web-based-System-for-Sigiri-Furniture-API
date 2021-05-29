/**This file contains CRUD operation implementation for ledger page
owned by IT19965550
Walpola S.R.
*/
const express = require('express');
const details = require('../models/ledger');
const router = express.Router();

//saving the post - create
router.post('/ledgers/save',(req,res)=>{

    let input_type = new details(req.body);

    input_type.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"ledger data details saved successfully"
        });
    });
});

//retrieve data - get 
router.route("/ledgers").get((req,res) => {

    details.find().then((details) => {
        res.json(details)
    }).catch((err) => {
        console.log(err)
    })
})

//updating details - update
router.put('/ledgers/update/:id',(req,res) =>{
    details.findByIdAndUpdate(
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
router.route("/ledgers/delete/:id").delete(async (req,res) => {

        const del = req.params.id ;

    await details.findByIdAndRemove(del,function(error, result) {
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