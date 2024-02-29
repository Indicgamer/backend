const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();
(async() =>{
    try{
        await mongoose.connect("mongodb+srv://indic_gamer:<password>@cluster0.3gah2fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to the database");
    }catch(e){
        console.log("MongoDB error: ",e);
    }
})();


//middleware
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
    }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello World");
})


const users = mongoose.Schema({
    username:String,
    password:String
});

const usersModel = mongoose.model("users",users);



app.post("/register",(req,res)=>{
    if(req.session.isLoggedIn){
        res.send("You are already logged in");
    }
    const [username,password] = [req.body.username,req.body.password];
    const user = usersModel({
        username:username,
        password:password
    });
    user.save().then(()=>{
        res.send("User registered successfully");
        req.session.isLoggedIn = true;
    }).catch((e)=>{
        res.status(500).send("Error: "+e);
    });
})

app.get("/users",(req,res)=>{
    if(!req.session.isLoggedIn){
        res.send("You are not logged in");
    }
    usersModel.find().then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send("Error: "+e);
    });
});

app.delete("/users/:username",(req,res)=>{
    if(!req.session.isLoggedIn){
        res.send("You are not logged in");
    }
    usersModel.deleteOne({username:req.params.username}).then(()=>{
        res.send("User deleted successfully");
    }).catch((e)=>{
        res.status(500).send("Error: "+e);
    });
});





app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});