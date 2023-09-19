const router = require('express').Router();
const menuList = require('../controllers/MenuList');
const studList = require('../controllers/studList');

router.get("/list", menuList);
router.post("/students", studList);


module.exports = router;