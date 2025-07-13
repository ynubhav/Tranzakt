const express=require('express')
const cors=require('cors');
const jsonwebtoken=require('jsonwebtoken')
const userrouter=require('./user');
const { accountrouter } = require('./account');
const router=express.Router();

router.use(express.json());
router.use('/user',userrouter);
router.use('/account',accountrouter);

module.exports=router;