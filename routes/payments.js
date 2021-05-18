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

//get the post - read
router.get('/payments',(req,res) =>{//postman giving path is this 
    payments.find().exec((err,payments) =>{//in post.find p is not capital 
        if(err){
           return res.status(400).json({
               error:err
           });     
        }
        return res.status(200).json({
            success:true,
            existingPosts:payments
        });
    });
});

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

//deleting post - delete
router.delete('/payments/delete/:id',(req,res) =>{
    payments.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletedPost
        });
    });
});

module.exports = router;