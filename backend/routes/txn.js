const router = require('express').Router();
const userTxn = require('../controllers/txnData');


router.post('/history', userTxn);


module.exports = router;