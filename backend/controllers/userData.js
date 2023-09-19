const userInfo = require('../models/Userinfo');
const vendor = require('../models/vendors');

async function userData(Id, person) {
    try {
        let data = null;
        if (person === 'Student')
            data = await userInfo.findOne({ id: Id });
        else if (person === 'Vendor' || person === 'Admin')
            data = await vendor.findOne({ id: Id });

           return data;
    }
    catch (error) {
        return error;
    }
}



module.exports = userData;