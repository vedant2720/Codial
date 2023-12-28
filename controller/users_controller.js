
const User=require('../models/user');

module.exports.profile=function(req,res)
{
    return res.render('user',{
        title:"user profile"
    })
}

module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"sign up page"
    })
}

// rendering the sign in page
module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_In',{
        title:"sign In page"
    })
}

// get the signup Data
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({ email:req.body.email })
    .then((user) => {
    if (!user) {
      // If the user doesn't exist, create a new one
      return User.create(req.body);
    }
    // If the user already exists, redirect back
        return res.redirect('back');
    })
    .catch((err) => {
        console.error('Error occurred:', err);
        return res.status(500).send('Internal Server Error');
    });
}

// sign in and create session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }