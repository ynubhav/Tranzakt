const express=require('express');
const cors=require('cors');
const jsonwebtoken=require('jsonwebtoken');
const { newuservalidation } = require('../zodschema/newuser');
const {currentuservalidation}=require('../zodschema/currentuser')
const userrouter=express.Router();
const {JWT_SECRET}=require('../config');
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
    const acc=await Accounts.create({userId:user._id,balance:(1+Math.floor(Math.random()*10000))});
    const token=jsonwebtoken.sign({userId:user._id },JWT_SECRET,{ expiresIn: '30m' });
    res.status(200).json({message: "User created successfully",token:`Bearer ${token}`});
    }
    else
    {
        res.status(411).json({message:"Email already taken / Incorrect inputs"})
    }
    }
    catch(err){
        res.status(409).json({message:"mail already taken / Incorrect inputs"});
    }
    finally{
    }
})

//======signin-route===================//
userrouter.post('/signin',async(req,res)=>{

    try {
    const data = req.body;
    const valid = currentuservalidation.safeParse(data);
    const databasearr = await User.find(data); // You should probably be doing a findOne with email
    const payload = databasearr[0];

    if (valid.success && databasearr.length) {
        const token = jsonwebtoken.sign(
            { userId: payload._id }, // safer to not include whole user
            JWT_SECRET,
            { expiresIn: '30m' }
        );
        res.status(200).json({ token: `Bearer ${token}` });
    } else {
        res.status(411).json({ message: "User not found" });
    }
} catch (error) {
    res.status(411).json({ message: "Error while logging in" });
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
    if(filter==='')
    {
    const filtereddata=[];
    filtereddata.reverse();
    const xdata=filtereddata.map((data,index)=>{
        return {firstname:data.firstname,lastname:data.lastname,_id:data._id,username:data.username}
    })
     return res.status(200).json({users:xdata});
    }
    const filtereddata=await User.find({$or:[{firstname:filter},{lastname:filter},{username:filter}]});
    const xdata=filtereddata.map((data,index)=>{
        return {firstname:data.firstname, lastname:data.lastname, _id:data._id, username:data.username}
    })
    res.status(200).json({users:xdata});
})
//=================route to get me==============//
userrouter.get('/me',authmiddleware,async(req,res)=>{
try{
    const id=req.userId;
    const user=await User.findById(id);
    const account=await Accounts.findOne({userId:id});
    res.status(200).json({firstname:user.firstname,balance:account.balance});
}
catch(err)
{
    console.log(err);
    res.status(411).json({message:'something is wrong'});
}
})
//==================route to add or remove friend===========//
// needs friend id and firstname
userrouter.post('/friends',authmiddleware,async(req,res)=>{

    try{
    const action=req.query.action;
    const id=req.userId;
    // three actions add, remove and find
    if(action!='find'&&action!='add'&&action!='remove')
    {    res.status(404).json({message:'undefined action'});
     return;
    }
    const user=await User.findById(id).populate("friends", "firstname lastname username _id");
    const friends=user.friends;
    if(action==='find')//find all friends username and firstname and id
    {
        res.status(200).json({friends:friends});
        return
    }
    const data=req.body;
    const friendid=data.userId;
    const friendname=data.firstname;
    if(action==='add')
    {
        // userId:{type :mongoose.Schema.Types.ObjectId},firstname:String
        const x=await User.findByIdAndUpdate(id,{$addToSet:{friends:friendid}})
        res.status(200).json({message:`added ${friendname} as friend`})
        return

    }
    if(action==='remove')
    {
        const y=await User.findByIdAndUpdate(id,{$pull:{friends:friendid}})
        res.status(200).json({message:`removed ${friendname} as friend`})
        return
    }
    }
    catch(err)
    {
        res.status(404).json({message:'something went wronng'});
    }

})
module.exports=userrouter;


