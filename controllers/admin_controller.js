const User=require('../models/User')
const Blog=require('../models/Blog')

module.exports.allUsers=async (req,res)=>{
    try{
        let users=await User.find({role:'content-writer'}).sort({createdAt:-1})
        return res.json({
            message:'All users sent!',
            users:users
        })
    }
    catch(err){
        return res.json({
            message:'Something went wrong!',
            users:null
        })
    }
}


module.exports.deleteUser=async (req,res)=>{
    try{
        let userId=req.params.userId;
        await User.findByIdAndDelete(userId);
        return res.json({
            message:'User deleted!'
        })
    }
    catch(err){
        return res.json({
            message:'Something went wrong!'
        })
    }   
}



module.exports.addContentWriter=async (req,res)=>{
    try{
        let user=await User.findOne({username:req.body.username});
        if(user){
            return res.json({
                message:"Username already taken!",
                user:null
            })
        }
        else{
            let new_user=new User(req.body);
            let new_user_created=await new_user.save();
    
            return res.json({
                message:"New user created!",
                user:new_user_created
            })
        }
    }
    catch(err){
        console.log(err);
        return res.json({
            message:"Something went wrong!",
            user:null
        })
    }
}



module.exports.deleteBlog=async (req,res)=>{
    try{
        let blogId=req.params.blogId;
        let blog=await Blog.findById(blogId);
        
        //removing the blog reference stored in the blogs array fo the author
        await User.findByIdAndUpdate(blog.author,{
            $pull:{ blogs:blogId }
        });

        //deleting the blog
        await Blog.findByIdAndDelete(blogId);

        return res.json({
            message:'Blog deleted!'
        })
    }
    catch(err){
        return res.json({
            message:'Something went wrong!'
        })
    }   
}



module.exports.approveBlog=async(req,res)=>{
    try{
        let blogId=req.params.blogId;
        await Blog.findByIdAndUpdate(blogId,{
            isApproved:true
        });
        return res.json({
            message:'Blog approved!'
        })
    }
    catch(err){
        return res.json({
            message:'Something went wrong!'
        })
    }  
}