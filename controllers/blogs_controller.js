const Blog=require('../models/Blog');
const User=require('../models/User')

module.exports.createBlog=async (req,res)=>{
    try{
        let new_blog=new Blog(req.body);
        let new_blog_created=await new_blog.save();
        await User.findByIdAndUpdate(req.body.author,{
            $push:{ blogs:new_blog_created._id }
        });
        
        new_blog_created=await Blog.findById(new_blog_created._id).populate("author","username");

        return res.json({
            message:"New blog created!",
            blog:new_blog_created
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            message:"Something went wrong!",
            blog:null
        })
    }
}



module.exports.allBlogs=async (req,res)=>{
    try{
        let blogs=await Blog.find({}).populate('author','username').sort({createdAt:-1});
        return res.json({
            message:"All blogs sent!",
            blogs:blogs
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            message:"Something went wrong!",
            blogs:null
        })
    }
}


module.exports.myBlogs=async (req,res)=>{
    try{
        let user=await User.findById(req.params.userId).populate({
            path:"blogs",
            populate:{
                path:"author",
                select:'username'
            }
        })
        let blogs=user.blogs;
        return res.json({
            message:"My blogs sent!",
            blogs:blogs
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            message:"Something went wrong!",
            blogs:null
        })
    }
}