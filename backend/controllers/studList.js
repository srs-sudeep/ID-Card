const userInfo = require('../models/Userinfo');


const list = async(req,res)=>{
    try{
        const stud = await userInfo.find({mess: 'Galav Mess'});
        // console.log(stud);
        return res.json(stud);
    }
    catch(error){
        console.log(error);
        return res.status(500);
    }
}


module.exports = list;