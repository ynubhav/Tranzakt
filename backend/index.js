const express = require("express");
const cors=require('cors');
const jsonwebtoken=require('jsonwebtoken')
const router=require('./routes/index')

const zod=require('zod');
const app=express();


app.use(cors());
app.use('/api/v1',router);

app.listen(3000,()=>{console.log('listening on port 3000')});