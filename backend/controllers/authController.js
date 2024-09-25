import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

//sign up
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ msg: "plz fill all the field", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      msg: "user created succesfully",
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//sign in
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).json({
        success: false,
        msg: "plz fill all the field",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credential" });
    }

    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", token, {
      httpOnly: true, // This flag makes sure the cookie is not accessible via JavaScript on the client-side
      secure: true, // Ensures the cookie is only sent over HTTPS (should be true in production)
      sameSite: "strict", // Ensures the cookie is only sent on requests from the same site
      maxAge: 360000000,
    });

    return res.status(201).json({
      token,
      user,
      success: true,
      msg: "login successfully",
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
// signout
export const logout = (req, res) => {
  res.cookie("token", "", { expiresIn: new Date(Date.now) });
  return res.json({ success: true, msg: "Logged out succesfully" });
};
