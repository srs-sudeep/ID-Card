const User = require("../models/User");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const userData = require('../controllers/userData');
// const Userinfo = require("../models/Userinfo");


const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        const person = req.header("person");
        // console.log(person, 'middle');
        const decodedToken = jwt_decode(token); // Use a JWT library to decode the token
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" });
        if (decodedToken.exp && decodedToken.exp < currentTimeInSeconds) {
            // Token has expired
            console.log('Token has expired.');
            return res.status(401).json({ msg: 'Your Session expired. Please log in again.' });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            localStorage.clear();
            sessionStorage.clear();
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        }
        const user = await User.findById(verified.id);
        // req.user = verified.id;
        if (!user) return res.status(404).json({ msg: 'User not found' });
        const userInfo = await userData(String(user.userId), person);
        // console.log(userInfo);
        res.json({ userInfo });
        next();
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message });
    }

}

module.exports = auth;