const express = require("express");
const session = require("express-session");

const app = express();

//middleware
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
    }));


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/login",(req,res)=>{
    if(req.session.isLoggedIn){
        res.send("You are already logged in");
    }
    req.session.isLoggedIn = true;
    res.send("Logged in");
})



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});