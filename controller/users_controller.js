
const User=require('../models/user');

module.exports.profile=function(req,res)
{
    // if user is authenticated then shows his email and password
    // console.log(req);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user)=>{
            return res.render('user',{
                title:"user info",
                password:user.password,
                email:user.email
            })
        })
        .catch((err)=>{
            return res.redirect('/users/sign-in');
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',{
        title:"sign up page"
    })
}

// rendering the sign in page
module.exports.signIn=function(req,res)
{
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
    //finding the user
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            // if user found and password are not matching
            if(user.password!=req.body.password)
            {
                return res.redirect('back');
            }
            else{
                // all are correct then create session for the user
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            }
        }
        else
        {
            //if user not found then redirect
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.error('Error occurred:', err);
        return res.status(500).send('Internal Server Error');
    })
}