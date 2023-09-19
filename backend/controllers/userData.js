const userInfo = require('../models/Userinfo');


async function userData(Id){
    try{
       const user = await userInfo.findOne({id: Id});
    //    console.log('hi',user);
       return user;
    }
    catch(error){
        return error;
    }
}



module.exports = userData;