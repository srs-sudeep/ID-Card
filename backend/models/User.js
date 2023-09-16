const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Podcast" }],
  pausedPodcast: { podcast: { type: Schema.Types.ObjectId, ref: "Podcast" }, position: Number },
});

module.exports = mongoose.model("User", userSchema);
