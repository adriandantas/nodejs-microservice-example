const Film = require('../models/filmRepository');
const logger = require('../util/logger');

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
  logger.info({ message: 'Retrieved list of films' });
  res.json(films);
}

async function findById(req, res) {
  const { id } = req.params;
  const film = await Film.findById(id);
  if (!film) {
    logger.error({ message: `The film with the given ID was not found.` });
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  }
  logger.info({ message: `Retrieved film with ID ${id}` });
  return res.json(film);
}

async function create(req, res) {
  const film = await Film.create(req.body);
  logger.info({ message: `Created film with ID ${film.id}` });
  return res.status(201).json(film);
}

async function update(req, res) {
  const data = { _id: req.params.id, ...getFilm(req.body) };
  const film = await Film.update(data);
  if (!film) {
    logger.error({ message: `The film with the given ID was not found.` });
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  }
  logger.info({ message: `Updated film with ID ${film.id}` });
  return res.json(film);
}

async function remove(req, res) {
  const { id } = req.params;
  const film = await Film.remove(id);
  if (!film) {
    logger.error({ message: `The film with the given ID was not found.` });
    return res.status(404).json({
      error: 'Not found',
      message: 'The film with the given ID was not found.',
    });
  }
  logger.info({ message: `Deleted film with ID ${film.id}` });
  return res.status(204).send();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
