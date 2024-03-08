const becrypt = require("bcrypt");
const {Users, Products_idea} = require("../config/db");

const registerController = async (req, res) => {
  try {
    if(!(req.body.username && req.body.password)){
      return  res.status(400).json({message:"Username and password are required", success:false});
    }
    const existingUser = await Users.find({ username: req.body.username });
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }
    const salt = await becrypt.genSalt(10);
    const password = String(req.body.password);
    const hashedPassword = await becrypt.hash(password, salt);
    const id = await Users.find().countDocuments();
    const user = new Users({
      _id: id + 1,
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    let thirtyDays = 1000 * 60 * 60 * 24 * 30; //30 days worth of milliseconds
    res.cookie("_id", id + 1, {
      maxAge: thirtyDays,
      path: "/",
      sameSite: "None",
      secure: true,
    });
    return res.status(201).json({ message: "User created Successfully", success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error "+error,
      success: false,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    if(!(req.body.username && req.body.password)){
      return  res.status(400).json({message:"Username and password are required", success:false});
    }
    const user = await Users.find({username:req.body.username});
    if(user.length === 0){
      return res.status(400).json({message:"User doesn't exist", success:false});
    }

    const password = String(req.body.password);
    const validPassword = await becrypt.compare(password, user[0].password);
    if(!validPassword){
      return res.status(400).json({message:"Invalid password", success:false});
    }
    // req.session.isLoggedIn = true;
    // req.session.username = req.body.username;
    let thirtyDays = 1000 * 60 * 60 * 24 * 30; //30 days worth of milliseconds
    res.cookie("_id", user[0]._id, {
      maxAge: thirtyDays,
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    return res.status(200).json({message:"Logged in successfully", success:true});

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"+error,
      success: false,
    });
  }
};

module.exports = { registerController, LoginController };
