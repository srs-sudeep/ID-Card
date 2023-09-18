const router = require('express').Router();
const menuList = require('../controllers/MenuList')

router.get("/list", menuList);


module.exports = router;