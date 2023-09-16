const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in." });
      }
      return res.json({
        message: "User registered and logged in.",
        user: newUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

exports.logIn = (req, res) => {
  res.json({ message: "User logged in.", user: req.user });
};

exports.logOut = (req, res) => {
  req.logout();
  res.json({ message: "User logged out." });
};
