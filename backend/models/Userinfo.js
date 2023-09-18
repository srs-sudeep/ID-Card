const mongoose = require("mongoose");

const userinfoSchema = new mongoose.Schema({
    id : { type: String, unique :true, default : "12241180"},
    name : { type : String, required : true ,default : "Nishant"},
    email : {type : String, required : true , default : "nishant@gmail.com"},
    mess : {type : String, default :"Galav"},
    remaining_amount :{type : Number, default : 1000},
    total_amout : {type : Number , default : 20000}
});

// userinfoSchema.save()
//     .then(()=> {
//         console.log("save");
//     })

module.exports = userInfo = mongoose.model("userinfo", userinfoSchema);