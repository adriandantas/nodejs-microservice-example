const FilmModel = require('./filmModel');
const CustomError = require('../util/customError');

async function findAll() {
  const films = await FilmModel.find();
  return films;
}

async function findById(id) {
  try {
    const film = await FilmModel.findById(id);
    return film;
  } catch (e) {
    throw new CustomError({
      message: 'Database exception',
      source: e,
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
