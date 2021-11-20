const express=require("express");
const port=process.env.PORT || 8000;
const app=express();

//to read the environment variables
//mongodb url is in .env file
const dotenv = require('dotenv');
dotenv.config();


const cookieParser=require("cookie-parser");  //parse the cookies
const session=require("express-session");   //create sessions and also we need express-session for session cookie
//we need session to keep the user logged in


app.use(express.json());

const cors=require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


//initialize the session
app.use(session({
    key:"userId",                     //cookie name
    secret:"blahhhblahhhhhblahhhh",   //used for encryption
    resave:"false",
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000  //in milliseconds
    }
}))

const db=require("./config/mongoose");

app.use("/",require("./routes/index"));

app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(`blog-site-server is up and running on port ${port}`);
})



//note:- session cookies are deleted when the browser closes and persistent cookies are deleted when their expiration time is up