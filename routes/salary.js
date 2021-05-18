/**This file contains CRUD operation implementation for dailyincome page
owned by IT19965550
Walpola S.R.
*/


const express = require('express');
const sals = require('../models/salary');

const router = express.Router();


//get the post - read
router.post('/sals/save',(req,res)=>{

    let Sal = new sals(req.body);

    Sal.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Salary saved successfully"
        });
    });

});

//get the post - read
router.get('/sals',(req,res) =>{//postman giving path is this 
    sals.find().exec((err,sals) =>{//in post.find p is not capital 
        if(err){
           return res.status(400).json({
               error:err
           });     
        }
        return res.status(200).json({
            success:true,
            existingPosts:sals
        });
    });
});


//updating posts - update
router.put('/sals/update/:id',(req,res) =>{
    sals.findByIdAndUpdate(
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
router.delete('/sals/delete/:id',(req,res) =>{
    sals.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletedPost
        });
    });
});



module.exports = router;