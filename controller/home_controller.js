module.exports.home=function(req,res){
    console.log(req.cookies);

    //we change the value of cookie in the response.
    return res.render('home',{
        title:"Home"
    })
}