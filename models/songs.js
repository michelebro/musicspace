const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
  },
}, { timestamps: true });

const songsSchema = new Schema({
  songTitle: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  //completed: Boolean,
  //ratings: [ratingSchema],
  spotifyLink: { type: String, required: true },
});

// const songs = mongoose.model('songs', songsSchema);
  module.exports = mongoose.model('Song', songsSchema);