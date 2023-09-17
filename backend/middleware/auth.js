const User = require("../models/User");
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        const user = await User.findById(verified.id);
        // req.user = verified.id;
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Include the entire user object in the response
        res.json({ user });
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = auth;