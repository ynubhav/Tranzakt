const mongoose=require('mongoose')
const {connectionstring}=require('./config');
const { Schema, boolean } = require('zod');

mongoose.connect('mongodb+srv://anubhavdixit35:znzf2GhH8dwISgi5@cluster0.zrb06vd.mongodb.net/Paytmapp');
//please don't !!! 
const transactionschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
    firstname:String,
    credit:Boolean,
    amount:Number,
    time: { type: Date }
})

const Userschema= new mongoose.Schema(
    {
        username:{type:String,unique:true},
        firstname: String,
        lastname:String,
        password:String,
        friends:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    });

const accountschema=new mongoose.Schema(
    {
        userId:{type : mongoose.Schema.Types.ObjectId,ref:"User"},
        balance:Number,
        transctions:[transactionschema],
    });

const Accounts=mongoose.model('Accounts',accountschema);
const User = mongoose.model('User',Userschema);

module.exports={
    User,
    Accounts
}

// for every user   User:friends array={userid}, Account:tranzaktions array=[{credit/debit , userid , time/date, amount }],