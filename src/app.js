const express = require('express');
const helmet = require('helmet');

const filmController = require('./controllers/filmController');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/films', filmController.findAll);
app.get('/films/:id', filmController.findById);
app.post('/films', filmController.create);
app.put('/films/:id', filmController.update);
app.delete('/films/:id', filmController.remove);

module.exports = app;
