const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
  },
  {
    collection: 'Film',
    versionKey: false,
  },
);

module.exports = mongoose.model('Film', filmSchema);
