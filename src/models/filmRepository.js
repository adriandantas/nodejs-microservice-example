const Joi = require('joi');
const FilmModel = require('./filmModel');

function validate(film) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    year: Joi.number().min(1895).required(),
    director: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  });

  return schema.validate(film);
}

async function findAll() {
  const films = await FilmModel.find();
  return films;
}

async function findById(id) {
  const film = await FilmModel.findById(id);
  return film;
}

async function create(data) {
  let film = new FilmModel({
    _id: data._id,
    title: data.title,
    year: data.year,
    director: data.director,
    genre: data.genre,
  });
  film = await film.save();
  return film;
}

async function update(filmData) {
  const film = await FilmModel.findByIdAndUpdate(
    filmData.id,
    {
      title: filmData.title,
      year: filmData.year,
      director: filmData.director,
      genre: filmData.genre,
    },
    { new: true },
  );

  if (!film) {
    throw new Error('The film with the given ID was not found.');
  }
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
  validate,
};
