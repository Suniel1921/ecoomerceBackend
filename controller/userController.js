
const userModel = require("../model/userModel");
const userHelper = require("../helper/userHelper");
const JWT = require("jsonwebtoken");

// User registration route
exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send({ success: false, message: "All Fields are required" });
      }
  
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        return res.status(400).send({ success: false, message: "Email Already Exists" });
      }
  
      const hashedPassword = await userHelper.hashPassword(password);
      const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).send({ success: true, message: "User Registered Successfully", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "User registration failed" });
    }
  };
  
// User login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const userExit = await userModel.findOne({ email });
    if (!userExit) {
      return res.status(400).send({ success: false, message: "Email Not Exist" });
    }

    const passwordMatch = await userHelper.comparePassword(password, userExit.password);
    if (!passwordMatch) {
      return res.status(400).send({ success: false, message: "Invalid Email or Password" });
    }

    const token = JWT.sign({_id: userExit._id }, process.env.SECRATE_TOKEN_KEY, {
      expiresIn: "5d",
    });

    res.status(200).send({ success: true, message: "Logged In Successfully!", userExit, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: `Login failed ${error}`});
  }
};

// Test route
exports.test = (req, res) => {
  res.send("I am a protected route");
};

// Admin route
exports.admin = (req, res) => {
  res.send("I am an admin dashboard");
};







