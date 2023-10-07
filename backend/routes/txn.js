const router = require('express').Router();
const userTxn = require('../controllers/txnData');
const messTxn = require('../controllers/MessTrxn');
const tokenValid = require("../middleware/tokenValid");


router.post('/history', userTxn);
router.post('/details', messTxn);


module.exports = router;