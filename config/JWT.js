const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
    const token=req.headers["x-access-token"];

    if(!token)
        res.json({
            message:"Token not found!"
        })
    else{
        jwt.verify(token,"jwtsecrettttblahhblahhh", (err,decoded)=>{
            if(err){
                res.json({
                    message:"Failed to authenticate!"
                })
            }
            else{
                req.jwtUserId=decoded.id
                next();
            }
        })
    }
}
