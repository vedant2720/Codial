module.exports.home=function(req,res){
    console.log(req.cookies);

    //we change the value of cookie in the response.
    res.cookie('user',30);
    return res.render('home',{
        title:"Home"
    })
}