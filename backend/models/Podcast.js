const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  type: { type: String, enum: ["audio", "video"], required: true },
  speaker: String,
  fileUrl: { type: String, required: true },
});

module.exports = mongoose.model("Podcast", podcastSchema);
