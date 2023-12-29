const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post)
    .then((post)=>{
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        })
        .then((comment) => {
            // Make sure Post.comment is initialized as an array
            post.comment = post.comment || [];
            
            // Now you can safely push the comment and save
            post.comment.push(comment);
            post.save();
            
            return res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
            return console.log("error while creating the comment");
        });
    })
    .catch((err)=>{
        return console.log("error in finding the post");
    });
}




