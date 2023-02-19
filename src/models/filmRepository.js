const mongoose = require('mongoose');
const FilmModel = require('./filmModel');
const AppError = require('../util/customError');

async function findAll() {
  const films = await FilmModel.find();
  return films;
}

async function findById(id) {
  try {
    const film = await FilmModel.findById(id);
    return film;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new AppError({
        message: 'Invalid id format',
        source: error,
      });
    }
    throw new AppError({
      message: 'Database exception',
      source: error,
    });
  }
}

async function create(data) {
  let film = new FilmModel(data);
  film = await film.save();
  return film;
}

async function update(filmData) {
  const film = await FilmModel.findByIdAndUpdate(
    filmData._id,
    {
      title: filmData.title,
      year: filmData.year,
      director: filmData.director,
      genre: filmData.genre,
    },
    { new: true },
  );
  return film;
}

async function remove(id) {
  const film = await FilmModel.findByIdAndRemove(id);
  if (!film) {
    throw new Error('The film with the given ID was not found.');
  }
  return film;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
