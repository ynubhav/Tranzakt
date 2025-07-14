const {JWT_SECRET}=require('./config')
const jsonwebtoken=require('jsonwebtoken');

function authmiddleware(req,res,next){

    const check=req.headers.authorization;
    if(check && check.startsWith('Bearer '))
    {
    try {
    const auth=req.headers.authorization;
    const x=auth.split(' ')[1];
    const verify=jsonwebtoken.verify(x,JWT_SECRET);
    req.userId=verify.userId;
    //req.firstname=verify.firstname;
    next();
    } catch (error) {
        res.status(403).json({message: " invalid token"})
    }
    }
    else
   { if(check)
    res.status(401).json({message: "invalid token"})
    else
    res.status(402).json({message: "invalid token"})
}
}

module.exports={
    authmiddleware
}