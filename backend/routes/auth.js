/* eslint-disable*/
const router = require("express").Router();
const passport = require("passport");
const { signUp, logIn, logOut } = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/login", passport.authenticate("local"), logIn);
router.get("/logout", logOut);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google"), logIn);

module.exports = router;
