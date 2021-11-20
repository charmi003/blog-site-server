const express=require('express');
const router=express.Router();
const verifyJWT=require('../config/JWT');

const auth_controller=require('../controllers/auth_controller')
const blogs_controller=require('../controllers/blogs_controller')
const admin_controller=require('../controllers/admin_controller')

router.post('/auth/login',auth_controller.login);
router.get('/auth/login-status',auth_controller.checkLoginStatus);
router.get('/auth/logout',auth_controller.logout);

router.post('/blogs/create',verifyJWT,blogs_controller.createBlog);
router.get('/blogs/all-blogs',blogs_controller.allBlogs)
router.get('/blogs/my-blogs/:userId',verifyJWT,blogs_controller.myBlogs);

router.get('/admin/all-users',verifyJWT,admin_controller.allUsers);
router.get('/admin/delete-user/:userId',verifyJWT,admin_controller.deleteUser)
router.post('/admin/add-content-writer',verifyJWT,admin_controller.addContentWriter);
router.get('/admin/delete-blog/:blogId',verifyJWT,admin_controller.deleteBlog);
router.get('/admin/approve-blog/:blogId',verifyJWT,admin_controller.approveBlog)

module.exports=router;



//middleware verifyJWT to verify that the user making the req has the correct web token