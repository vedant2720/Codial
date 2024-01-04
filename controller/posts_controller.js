
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res)
{
    try {
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created"
            })
        }

        req.flash('success',"Post Published!");
        return res.redirect('back');
    } catch (error) {

        req,flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
   try {
        let post=await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    
        if (!post) {
            return res.status(404).send("Post not found");
        }

        await Comment.deleteMany({ post: req.params.id });
        req.flash('success',"Post and Associated Comments Deleted Successfully!");
        return res.redirect('/');
   } catch (err){
        req,flash('error',err);
        return res.redirect('back');
   }
};
