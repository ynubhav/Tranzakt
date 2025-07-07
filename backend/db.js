const mongoose=require('mongoose')
const {connectionstring}=require('./config')

mongoose.connect('mongodb+srv://anubhavdixit35:znzf2GhH8dwISgi5@cluster0.zrb06vd.mongodb.net/Paytmapp');
//please don't !!! 
const Userschema= new mongoose.Schema({username:{type:String,unique:true}, firstname: String, lastname:String , password:String });

const accountschema=new mongoose.Schema({userId:{type : mongoose.Schema.Types.ObjectId,ref:"User"},balance:Number});

const Accounts=mongoose.model('Accounts',accountschema);
const User = mongoose.model('User',Userschema);

module.exports={
    User,
    Accounts
}