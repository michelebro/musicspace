const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  songTitle: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
});

const ratingSchema = new Schema({
  rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
  },
}, { timestamps: true });

const songs = mongoose.model('songs', songsSchema);
  module.exports = mongoose.model('songs', songsSchema);