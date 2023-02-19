const Film = require('../models/filmRepository');
const logger = require('../util/logger');
const AppError = require('../util/customError');

function reportNotFound(res) {
  logger.error({ message: `The requested resource could not be found.` });
  return res.status(404).json({
    error: 'Not found',
    message: 'The requested resource could not be found.',
  });
}

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
  let film = null;
  try {
    film = await Film.findById(id);
  } catch (e) {
    if (e instanceof AppError) {
      if (e.message === 'Invalid id format') {
        logger.error({ message: `Invalid id format.` });
        return reportNotFound(res);
      }
    }
  }
  if (!film) {
    return reportNotFound(res);
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
    return reportNotFound(res);
  }
  logger.info({ message: `Updated film with ID ${film.id}` });
  return res.json(film);
}

async function remove(req, res) {
  const { id } = req.params;
  const film = await Film.remove(id);
  if (!film) {
    return reportNotFound(res);
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
