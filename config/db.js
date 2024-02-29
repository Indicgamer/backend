const mongoose = require("mongoose");

(async()=>{
    try{
        const Connection = await mongoose.connect("mongodb+srv://indic_gamer:admin123@cluster0.3gah2fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Successfully connected to the database");
    }catch(err){
        console.log(err);
    }
})();

const users = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Users = mongoose.model("users", users);


const products_idea = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

const Products_idea = mongoose.model("products_idea", products_idea);


module.exports = {Users, Products_idea};

