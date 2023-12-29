
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res)
{
    Post.create({
        content:req.body.content,
        user:req.user._id
    })
    .then((post)=>{
        return res.redirect('back');
    })
    .catch((err)=>{
        console.log("error in posting the post");
        return;
    });
}

module.exports.destroy = function(req, res) {
    Post.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        .then((post) => {
            if (!post) {
                return res.status(404).send("Post not found");
            }

            Comment.deleteMany({ post: req.params.id })
                .then(() => {
                    return res.redirect('/'); // Redirect to a specific route after successful removal
                })
                .catch((err) => {
                    console.error("Error deleting comments:", err);
                    return res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            console.error("Error finding the post:", err);
            return res.status(500).send("Internal Server Error");
        });
};
