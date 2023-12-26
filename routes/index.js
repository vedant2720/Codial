const express=require('express');

const router=express.Router();
const homeController=require('../controller/home_controller');

router.get('/',homeController.home);

//this line defines the route for user request.
router.use('/users',require('./users'));

console.log('router loaded');

module.exports=router;