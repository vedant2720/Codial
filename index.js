const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

// setting up the middleware to use cookie 
app.use(express.urlencoded());

// setting to use the cookie
app.use(cookieParser());

const port=8000;

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScript',true);
app.use(express.static('./assets'));
app.use('/',require('./routes'));

// setting the views engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);
    }

    //adding comment.
    console.log(`Server Running on ${port}`);
});