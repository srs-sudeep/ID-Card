const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  category: String
});

const mealSchema = new mongoose.Schema({
  type: String,
  items: [itemSchema],
});

const daySchema = new mongoose.Schema({
  name: String,
  meals: [mealSchema],
});

const galavMenu = mongoose.model('Menu', daySchema,'Galav Mess');
const kumarMenu = mongoose.model('Menu', daySchema,'Kumar Mess');
const saiMenu = mongoose.model('Menu', daySchema,'Sri Sai Mess');

module.exports.galavMenu = galavMenu;
module.exports.kumarMenu = kumarMenu;
module.exports.saiMenu = saiMenu;

