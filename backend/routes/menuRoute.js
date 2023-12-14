const router = require('express').Router();
const menuList = require('../controllers/MenuList');
const studList = require('../controllers/studList');
const tokenValid = require("../middleware/tokenValid");


router.post("/list" ,menuList);
router.post("/students",tokenValid, studList);


module.exports = router;