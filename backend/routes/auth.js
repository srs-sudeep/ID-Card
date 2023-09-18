/* eslint-disable*/
const router = require("express").Router();
// const passport = require("passport");
const { signUp, logIn, logOut } = require("../controllers/auth");
const auth = require("../middleware/auth");
const tokenValid = require("../middleware/tokenValid");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/verify", auth);
router.get("/validation", tokenValid);
// router.get("/menu",menu);

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get("/google/callback", passport.authenticate("google"), logIn);

module.exports = router;
