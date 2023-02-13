const Joi = require('joi');
const Film = require('./filmModel');

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
  const films = await Film.find();
  return films;
}

async function findById(id) {
  const film = await Film.findById(id);
  return film;
}

async function create(filmData) {
  let film = new Film({
    title: filmData.title,
    year: filmData.year,
    director: filmData.director,
    genre: filmData.genre,
  });
  film = await film.save();
  return film;
}

async function update(filmData) {
  const film = await Film.findByIdAndUpdate(
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
  const film = await Film.findByIdAndRemove(id);
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
