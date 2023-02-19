const Ajv = require('ajv');

const ajv = new Ajv();
const mongoose = require('mongoose');
const logger = require('../util/logger');

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    year: { type: 'integer' },
    director: { type: 'string' },
    genre: { type: 'string' },
  },
  required: ['title', 'year', 'director', 'genre'],
};

const validate = ajv.compile(schema);

// const filmSchema = Joi.object({
//   title: Joi.string().min(3).required(),
//   year: Joi.number().min(1895).required(),
//   director: Joi.string().min(3).required(),
//   genre: Joi.string().min(3).required(),
// });

// eslint-disable-next-line consistent-return
function validateFilm(req, res, next) {
  const valid = validate(req.body);
  if (!valid) {
    logger.error({ message: `Validation error on film data.` });
    return res.status(400).json({
      error: 'Invalid request',
      message: 'All fields are required',
    });
  }
  next();
}

// eslint-disable-next-line consistent-return
function validateId(req, res, next) {
  const { id } = req.params;

  if (mongoose.isObjectIdOrHexString(id)) {
    next();
  } else {
    logger.error({ message: `Invalid id format.` });
    return res.status(404).json({
      error: 'Not found',
      message: 'The requested resource could not be found.',
    });
  }
}
module.exports = {
  validateFilm,
  validateId,
};
