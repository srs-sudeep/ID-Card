const mongoose = required("mongoose");

const transactionSchema = new mongoose.Schema({
    account_from : { type : String , required: true },
    account_to : {type: String , required : true},
    amount : {type : Number, required : true},
    trns_type :{type : String , required : true},
    trns_date : {type : String , required : true},
    trns_mode : {type : String ,  required : true},
    trns_reference : { type : String , required :true , unique : true},
    remark : { type : String}
});

module.exports = transaction = mongoose.model("transaction", transactionSchema);