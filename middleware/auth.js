const jwt = require('jsonwebtoken')

function authmiddleware(req,res,next){
    const token=req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Access denied"})
    }
    try{
        const decoded=jwt.verify(token,"private_key");
        req.user=decoded;
        next()
    }catch(err){
       res.status(400).json({error:"Invaild Token"})
    }
}

module.exports = authmiddleware;
