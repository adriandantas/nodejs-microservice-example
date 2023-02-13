const { ValidationError } = require('joi');
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
  if (id === null || id.trim() === '') {
    logger.error({ message: 'Missing ID parameter.' });
    return res
      .status(400)
      .json({ error: 'Invalid request', message: 'Missing ID parameter.' });
  }
  const film = await Film.findById(req.params.id);
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
  const data = getFilm(req.body);
  const { error } = Film.validate(data);
  if (error) {
    if (error instanceof ValidationError) {
      logger.error({ message: `Validation error on film data.` });
      return res.status(400).json({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    }
    logger.error({ message: `Unknown error on parsing film data.` });
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Payload could not be processed.',
    });
  }
  const film = await Film.create(data);
  logger.info({ message: `Created film with ID ${film.id}` });
  return res.status(201).json(film);
}

async function update(req, res) {
  const { id } = req.params;
  if (id === null || id.trim() === '') {
    logger.error({ message: 'Missing ID parameter.' });
    return res
      .status(400)
      .json({ error: 'Invalid request', message: 'Missing ID parameter.' });
  }

  const { error } = Film.validate(req.body);
  if (error) {
    if (error instanceof ValidationError) {
      logger.error({ message: `Validation error on film data.` });
      return res.status(400).json({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    }
    logger.error({ message: `Unknown error on parsing film data.` });
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Payload could not be processed.',
    });
  }
  const data = { _id: id, ...getFilm(req.body) };
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
  if (id === null || id.trim() === '') {
    logger.error({ message: 'Missing ID parameter.' });
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Missing ID parameter.',
    });
  }
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
