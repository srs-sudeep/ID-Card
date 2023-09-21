const userInfo = require('../models/Userinfo');


const list = async (req, res) => {
    try {
        const { mess } = req.body;
        const projection = { _id: 0, email: 0, mess: 0, remaining_amount: 0, total_amount: 0, __v: 0 }
        const result = await userInfo.find({ mess: mess }, projection);
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
}


module.exports = list;