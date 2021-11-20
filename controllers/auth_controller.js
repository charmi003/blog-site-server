const User=require("../models/User");
const jwt=require("jsonwebtoken")

module.exports.login=async (req,res)=>{
    let user=await User.findOne({username:req.body.username});
    if(!user){
        return res.json({
            message:"Username not found!",
            user:null
        })
    }
    
    if(user.password!=req.body.password){
        return res.json({
            message:"Incorrect Password!",
            user:null
        })
    }
    
    //create a jwt token
    const id=user._id;
    const token=jwt.sign({id},"jwtsecrettttblahhblahhh",{
        expiresIn:'24h'
    })
      
    //create a session
    req.session.user=user;

    return res.json({
        message:"User found!",
        user:user,
        token:token
    })

}


module.exports.checkLoginStatus=(req,res)=>{
    if(req.session.user)
    {
        return res.json({
            isLoggedIn:true,
            user:req.session.user
        })
    }
    else
    return res.json({
        isLoggedIn:false,
        user:null
    })
}



module.exports.logout=(req,res)=>{
    res.clearCookie('userId');  //clearing the cookie
    req.session.destroy();    //destroying the session
    return res.json({
        message:"Logged out!"
    })
}