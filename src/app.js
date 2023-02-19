const express = require('express');
const helmet = require('helmet');

const { validateFilm, validateId } = require('./middlewares/validationMdw');
const filmController = require('./controllers/filmController');
const { healthCheck } = require('./controllers/healthcheckController');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/healthcheck', healthCheck);

app.get('/films', filmController.findAll);
app.get('/films/:id', validateId, filmController.findById);
app.post('/films', validateFilm, filmController.create);
app.put('/films/:id', validateId, validateFilm, filmController.update);
app.delete('/films/:id', validateId, filmController.remove);

module.exports = app;
