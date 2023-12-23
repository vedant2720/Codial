module.exports.profile=function(req,res)
{
    return res.render('user',{
        title:"user profile"
    })
}

module.exports.post=function(req,res)
{
    res.end('<h1>post users info</h1>');
}