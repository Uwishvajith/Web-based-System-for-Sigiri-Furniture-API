/**This file contains CRUD operation implementation for dailyincome page
owned by IT19965550
Walpola S.R.
*/
const express = require('express');
const posts = require('../models/posts');
const router = express.Router();

//saving the post - create
router.post('/posts/save',(req,res)=>{

    let newPost = new posts(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });
});

//retrieve data - get 
router.route("/posts").get((req,res) => {

    posts.find().then((posts) => {
        res.json(posts)
    }).catch((err) => {
        console.log(err)
    })
})

//updating posts - update
router.put('/posts/update/:id',(req,res) =>{
    posts.findByIdAndUpdate(
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
router.delete('/posts/delete/:id',(req,res) =>{
    posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletedPost
        });
    });
});

module.exports = router;