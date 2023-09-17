// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   googleId: String,
//   favorites: [{ type: Schema.Types.ObjectId, ref: "Podcast" }],
//   pausedPodcast: { podcast: { type: Schema.Types.ObjectId, ref: "Podcast" }, position: Number },
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  userId: { type: String },
  accountBal : { type: Number },
  messName: { type: String, default:'Galav'},
  imgPath: {type: String},
  addOn: {type: Number, default: 10000},
  basic: {type: Number, default: 13000},
  person: {type: String, default:'Student'}

});

module.exports = User = mongoose.model("user", userSchema);