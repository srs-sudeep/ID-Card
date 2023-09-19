const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String
});

const vendor  = mongoose.model('vendor', vendorSchema, 'vendors');


module.exports = vendor;