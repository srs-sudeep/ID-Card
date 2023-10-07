// const User = require("../models/User");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const {logOut} = require("../controllers/auth");

const tokenValid = async (req, res, next) => {
    try {
        const token = await req.cookies.authToken;
        // if (!token)
        //     logOut(req, res);
        // console.log('token = ', token);
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
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        }
        return res.status(200).json({person: verified.person});
        // next();
        // const user = await User.findById(verified.id);
        
        // if (!user) return res.status(404).json({ msg: 'User not found' });
       
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message });
    }

}

module.exports = tokenValid;