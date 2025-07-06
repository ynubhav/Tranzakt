const JWT_SECRET=require('./config')
const jsonwebtoken=require('jsonwebtoken');

function authmiddleware(req,res,next){

    const check=req.headers.authorization;
    if(check&& check.startsWith('Bearer '))
    {
    try {
    const auth=req.headers.authorization;
    const x=auth.split(' ')[1];
    const verify=jsonwebtoken.verify(x,JWT_SECRET);
    req.userId=verify.userId;
    next();
    } catch (error) {
        res.status(403).json({message: "invalid token"})
    }
    }
    else
    res.status(403).json({message: "1invalid token"})
}

module.exports={
    authmiddleware
}