const express=require('express');
const cors=require('cors');
const jsonwebtoken=require('jsonwebtoken');
const { newuservalidation } = require('../zodschema/newuser');
const {currentuservalidation}=require('../zodschema/currentuser')
const userrouter=express.Router();
const JWT_SECRET=require('../config');
const { default: mongoose } = require('mongoose');
const { User, Accounts } = require('../db');
const currentuser = require('../zodschema/currentuser');
const { authmiddleware } = require('../middlewares');

//======signup-route===================//
userrouter.post('/signup',async(req,res)=>{
    
    const data=req.body;
    const valid=newuservalidation.safeParse(data);

    try
   { 
    const databasearr= await User.find(data);
    if(valid.success && databasearr)
    {
    const user=await User.create(data);// returns the made entry
    const token=jsonwebtoken.sign({userId:user._id},JWT_SECRET);

    await Accounts.create({userId:user._id,balance:(1+Math.floor(Math.random()*10000))});

    res.status(200).json({message: "User created successfully",token:`Bearer ${token}`});
    }
    else
    {
        res.status(411).json({message:"Email already taken / Incorrect inputs"})
    }
    }
    catch(err){
        res.status(411).json({message:"mail already taken / Incorrect inputs"});
    }
})

//======signin-route===================//
userrouter.post('/signin',async(req,res)=>{
    
    const data=req.body;

    const valid=currentuservalidation.safeParse(data);

    const databasearr= await User.find(data);

    if(valid.success && databasearr.length){
      const token=jsonwebtoken.sign(data,JWT_SECRET);
     res.status(200).json({token:`Bearer ${token}`});}
    else
    {
        res.status(411).json({message: "Error while logging in"})
    }
    
})
//=============updatinginfo-using-auth-route=======================//
userrouter.put('/updateinfo',authmiddleware,async(req,res)=>{
    const uid=req.userId;
    const updateinfo=await User.findByIdAndUpdate(uid,req.body);
    if(updateinfo)
        res.status(200).json({message: "Updated successfully"});
    else
    res.status(411).json({message: "Error while updating information"});

})
//=================Route to get users from the backend==========//
userrouter.get('/bulk',async(req,res)=>{
    const filter=req.query.filter
    const filtereddata=await User.find({$or:[{firstname:filter},{lastname:filter}]});
    const xdata=filtereddata.map((data,index)=>{
        return {firstname:data.firstname,lastname:data.lastname,_id:data._id}
    })
    res.status(200).json({users:xdata});
})
module.exports=userrouter;


