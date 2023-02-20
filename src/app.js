const express = require('express');
const helmet = require('helmet');

const { validateFilm, validateId } = require('./middlewares/validationMdw');
const filmController = require('./controllers/filmController');
const { healthCheck } = require('./controllers/healthcheckController');

const app = express();
app.use(helmet());
app.use(express.json());


app.get('/api/healthcheck', healthCheck);
app.get('/api/films', filmController.findAll);
app.get('/api/films/:id', validateId, filmController.findById);
app.post('/api/films', validateFilm, filmController.create);
app.put('/api/films/:id', validateId, validateFilm, filmController.update);
app.delete('/api/films/:id', validateId, filmController.remove);

module.exports = app;
