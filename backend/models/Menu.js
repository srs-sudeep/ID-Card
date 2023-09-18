const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const mealSchema = new mongoose.Schema({
  type: String,
  items: [itemSchema],
});

const daySchema = new mongoose.Schema({
  name: String,
  meals: [mealSchema],
});

const Menu = mongoose.model('Menu', daySchema);

module.exports = Menu;
