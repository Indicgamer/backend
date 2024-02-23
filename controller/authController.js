const becrypt = require("bcrypt");
const Connection = require("../config/db");

const registerController = async (req, res) => {
  try {
    const [existingUser] = await (
      await Connection
    ).execute("SELECT * FROM users WHERE username = ?", [req.body.username]);
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }

    const salt = await becrypt.genSalt(10);
    const password = String(req.body.password);
    const hashedPassword = await becrypt.hash(password, salt);

    const [Res] = await (
      await Connection
    ).execute("INSERT INTO users (username, password) VALUES (?, ?)", [
      req.body.username,
      hashedPassword,
    ]);
    req.session.isLoggedIn = true;
    req.session.username = req.body.username;
    res
      .status(201)
      .json({ message: "User created successfully", success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    if(!(req.body.username && req.body.password)){
      return  res.status(400).json({message:"Username and password are required", success:false});
    }

    const [existingUser] = await (
      await Connection
    ).execute("SELECT * FROM users WHERE username = ?", [req.body.username]);
    if (existingUser.length === 0) {
      return res
        .status(400)
        .json({ message: "Username does not exist", success: false });
    }
    const password = String(req.body.password);
    const validPassword = await becrypt.compare(
      password,
      existingUser[0].password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    } else {
      req.session.isLoggedIn = true;
      req.session.username = req.body.username;
      res.status(200).json({ message: "Login successful", success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { registerController, LoginController };
