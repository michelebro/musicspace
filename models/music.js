const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  songTitle: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  coverImage: {
    type: String,
  }
});

module.exports = mongoose.model("MusicSpace", musicSchema);