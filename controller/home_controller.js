// module.exports.home=function(req,res){
//     console.log(req.cookies);

//     //we change the value of cookie in the response.
//     res.cookie('user',30);
//     return res.render('home',{
//         title:"Home"
//     })
// }

const Post=require('../models/post');

module.exports.home=function(req,res){
    console.log(req.cookies);
    //we change the value of cookie in the response.
    // Post.find({})
    // .then((posts)=>{
    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     })
    // })

    // populate the user of the each post 
    Post.find({}).populate('user').exec()
    .then((posts)=>{
        return res.render('home',{
            title:"Codial | Home",
            posts:posts
        })
    })
    .catch((err)=>{
        console.log('error in finding user who posted');
        return;
    })
}