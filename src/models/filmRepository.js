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
  let film = null;
  const data = {
    title: filmData.title,
    year: filmData.year,
    director: filmData.director,
    genre: filmData.genre,
  };
  try {
    film = await FilmModel.findByIdAndUpdate(filmData._id, data, { new: true });
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
  return film;
}

async function remove(id) {
  const film = await FilmModel.findByIdAndRemove(id);
  return film;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
