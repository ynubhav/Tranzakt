const express=require('express');
const { Accounts, User } = require('../db');
const { default: mongoose } = require('mongoose');
const { authmiddleware } = require('../middlewares');

const accountrouter=express();

accountrouter.get('/balance',async(req,res)=>{
    try {
    const userid=req.body.userId;
    const useraccount=await Accounts.findOne({userId:userid});
    res.status(200).json({balance:useraccount.balance});
    } catch (error) {
        res.status(411).json({message:'Invalid User'});
    }
})

accountrouter.post('/transfer',authmiddleware,async(req,res)=>{
//==========================start session==create-db-session
const session=await mongoose.startSession();

try{session.startTransaction();

const fromuserid=req.userId;
const touserid=req.body.to;
const amount=req.body.amount;
const to=await User.findById(touserid).session(session);
const from=await User.findById(fromuserid).session(session);
const timestamp = new Date();

  const toTransaction = {
    userId: touserid,
    credit: true,
    amount,
    time: timestamp,
    firstname:from.firstname,
  };
  const fromTransaction = {
    userId: fromuserid,
    credit: false,
    amount,
    time: timestamp,
    firstname:to.firstname,
  };

if(!mongoose.Types.ObjectId.isValid(fromuserid)||!mongoose.Types.ObjectId.isValid(touserid)){
    session.abortTransaction();
    return res.status(400).json({message:"invalid userid"})
}

const account=await Accounts.findOne({userId:fromuserid}).session(session);
const balance=(account?account.balance:0);
const senderexists=await Accounts.findOne({userId:fromuserid}).session(session);
const recieverexists=await Accounts.findOne({userId:touserid}).session(session);
if(amount>balance||!account||amount<0)
{
    await session.abortTransaction();
    return res.status(400).json({message:"Insufficient balance / Invalid SENDER"})
}
if(!senderexists||!recieverexists){
    await session.abortTransaction();
    return res.status(400).json({message:"Invalid account(s)"})
}
const x=await Accounts.findOneAndUpdate({userId:fromuserid},{ $inc: { balance: -amount },$push: { transctions: fromTransaction}},{session});
const y=await Accounts.findOneAndUpdate({userId:touserid},{ $inc: { balance:amount },$push: { transctions: toTransaction} },{session});

await session.commitTransaction();

res.status(200).json({message:"Transfer Successful"})}
catch(err){
    await session.abortTransaction();
    res.status(400).json({ message: err.message || "Transfer failed" });
}
finally{session.endSession();}
})

accountrouter.get('/transactions',authmiddleware,async(req,res)=>{

try{
    const id= req.userId;
    const account=await Accounts.findOne({userId:id});
    res.status(200).json({transactions:account.transctions})}
    catch(err){
        res.status(400).json({message:"somthing went wrong"});
    }

})



module.exports={
    accountrouter
}
