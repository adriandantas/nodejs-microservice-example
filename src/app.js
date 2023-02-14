const express = require('express');
const helmet = require('helmet');

const { validateFilm } = require('./middlewares/validationMdw');
const filmController = require('./controllers/filmController');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/films', filmController.findAll);
app.get('/films/:id', filmController.findById);
app.post('/films', validateFilm, filmController.create);
app.put('/films/:id', validateFilm, filmController.update);
app.delete('/films/:id', filmController.remove);

module.exports = app;
