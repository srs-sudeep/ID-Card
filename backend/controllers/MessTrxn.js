const messTxn = require('../models/CardTransection');


const messTrxn = async (req, res) => {
    const {name}= req.body;
    console.log(name)
    try {
        const details = await messTxn.find({trns_at: name});   
        return res.json(details);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
}



module.exports = messTrxn;