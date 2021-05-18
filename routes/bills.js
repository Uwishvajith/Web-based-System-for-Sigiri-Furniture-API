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

//get the post - read
router.get('/bills',(req,res) =>{//postman giving path is this 
    bills.find().exec((err,bills) =>{//in post.find p is not capital 
        if(err){
           return res.status(400).json({
               error:err
           });     
        }
        return res.status(200).json({
            success:true,
            existingPosts:bills
        });
    });
});

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

//deleting post - delete
router.delete('/bills/delete/:id',(req,res) =>{
    bills.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletedPost
        });
    });
});



module.exports = router;