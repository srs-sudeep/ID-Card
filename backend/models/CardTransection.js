const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    account_from : { type : String , required: true },
    account_to : {type: String , required : true},
    amount : {type : String, required : true},
    trns_type :{type : String , required : true},
    trns_date : {type : Date , required : true},
    food_type : {type : String ,  required : true},
    trns_at : {type: String, required :true},
    trns_reference : { type : String , required :true , unique : true},
    category : {type : String, required :true},
    remark : { type : String}
});

module.exports = transaction = mongoose.model("transaction", transactionSchema, 'Users Transaction');