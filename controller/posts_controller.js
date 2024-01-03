
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res)
{
    try {
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');
    } catch (error) {
        console.error("Error finding the post:", err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports.destroy = async function(req, res) {
   try {
        let post=await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    
        if (!post) {
            return res.status(404).send("Post not found");
        }

        await Comment.deleteMany({ post: req.params.id });
        return res.redirect('/');
   } catch (err){
        console.error("Error in deleting the post:", err);
        return res.status(500).send("Internal Server Error");
   }
};
