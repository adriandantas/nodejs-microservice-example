const { ValidationError } = require('joi');
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
  res.json(films);
}

async function findById(req, res) {
  const { id } = req.params;
  if (id === null || id.trim() === '') {
    return res.status(404).json({ message: 'Missing ID parameter.' });
  }
  const film = await Film.findById(req.params.id);
  if (!film)
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  return res.json(film);
}

async function create(req, res) {
  const { error } = Film.validate(req.body);
  if (error) {
    // TODO include logger
    if (error instanceof ValidationError)
      return res.status(400).json({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Payload could not be processed.',
    });
  }
  let film = getFilm(req.body);
  film = await Film.create(film);
  return res.status(201).json(film);
}

async function update(req, res) {
  const { error } = Film.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = getFilm(req.body);
  const film = await Film.update(data);
  if (!film)
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  return res.json(film);
}

async function remove(req, res) {
  const { id } = req.params;
  if (id === null || id.trim() === '') {
    return res.status(401).json({
      error: 'Invalid request',
      message: 'Missing ID parameter.',
    });
  }
  const film = await Film.remove(id);
  if (!film)
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  return res.json(film);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
