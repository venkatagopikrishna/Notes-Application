const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPW = bcrypt.hashSync(password, 8);

    await User.create({ email, password: hashedPW });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already in use" });
    } else {
      console.error("Error during sign-up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    const matchPW = bcrypt.compareSync(password, user.password);
    if (!matchPW) return res.sendStatus(401);

    const token = jwt.sign(
      { sub: user._id },
      process.env.JWT_SECRET, // ✅ Correct secret key
      { expiresIn: "30d" }
    );

    res.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(400);
  }
};

const logOut = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error during logout:", error);
    res.sendStatus(400);
  }
};

const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error("Error during auth check:", error);
    res.sendStatus(400);
  }
};

module.exports = { signUp, logIn, logOut, checkAuth };
