const router = require("express").Router();
const fetchMenu = require('../controllers/MenuList')


router.get("/list",fetchMenu);




module.exports = router; 