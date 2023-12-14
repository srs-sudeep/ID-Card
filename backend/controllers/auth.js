const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

exports.signUp = async (req, res) => {
  try {
    let { email, password } = req.body;
    // validate

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    // if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    // Set the expiration time (in seconds from the current time)
    const expirationTimeInSeconds = 1800; // 30 min
    const expirationTime = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
    const person = existingUser.person;
    const token = jwt.sign({ id: existingUser._id, person: existingUser.person, exp: expirationTime }, process.env.JWT_SECRET);
    res.cookie('authToken', token, { path: '/', domain: 'localhost', httpOnly: true, maxAge: 1800000 });
    return res.json({
      // token,
      person
    });
  } catch (err) {
    console.log('there is error in catch block');
    res.status(500).json({ error: err.message });
  }
};

exports.logOut = (req, res) => {
  // res.cookie('authToken', '', {path: '/', domain: 'localhost', httpOnly: true, maxAge: -1});
  // res.cookie('mess', '', {maxAge: -1});
  res.clearCookie('authToken');
  res.clearCookie('mess');
  res.status(200).json({ message: "User logged out." });
};
