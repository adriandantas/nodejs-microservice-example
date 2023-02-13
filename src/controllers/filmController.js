const Film = require('../models/filmRepository');

function getFilm(payload) {
  return {
    title: payload.title,
    year: payload.year,
    director: payload.director,
    genre: payload.genre,
  };
}

async function findAll(req, res) {
  const films = await Film.findAll();
  res.send(films);
}

async function findById(req, res) {
  const { id } = req.params;
  if (id === null || id.trim() === '') {
    return res.status(404).send('Missing ID parameter.');
  }
  const film = await Film.findById(req.params.id);
  if (!film)
    return res.status(404).send('The film with the given ID was not found.');
  return res.send(film);
}

async function create(req, res) {
  const { error } = Film.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let film = getFilm(req.body);
  film = await Film.create(film);
  return res.send(film);
}

async function update(req, res) {
  const { error } = Film.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = getFilm(req.body);
  const film = await Film.update(data);
  if (!film)
    return res.status(404).send('The film with the given ID was not found.');
  return res.send(film);
}

async function remove(req, res) {
  const { id } = req.params;
  if (id === null || id.trim() === '') {
    return res.status(404).send('Missing ID parameter.');
  }
  const film = await Film.remove(id);
  if (!film)
    return res.status(404).send('The film with the given ID was not found.');
  return res.send(film);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
