const express = require('express');
const helmet = require('helmet');

const { validateFilm, validateId } = require('./middlewares/validationMdw');
const filmController = require('./controllers/filmController');
const { healthCheck } = require('./controllers/healthcheckController');

const app = express();
app.use(helmet());
app.use(express.json());

/**
 * @swagger
 * definitions:
 *   Film:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Title of the film
 *       director:
 *         type: string
 *         description: Director of the film
 *       year:
 *         type: integer
 *         minimum: 1800
 *         description: Release year of the film
 *       genre:
 *         type: string
 *         description: Genre of the film
 *   Healthcheck:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         description: The status of the service, either OK or ERROR
 *         example: "OK"
 *       timestamp:
 *         type: string
 *         format: date-time
 *         description: The current timestamp of the request
 *         example: "1970-01-01T00:00:00.000Z"
 *       uptime:
 *         type: number
 *         description: The uptime of the service in milliseconds
 *         example: 123456789
 *       memoryUsage:
 *         type: object
 *         description: The memory usage of the service
 *       env:
 *         type: string
 *         description: The environment of the service, either "development" or "production"
 *         example: "production"
 */

/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     description: Healthcheck endpoint to check the status of the service
 *     tags:
 *       - Healthcheck
 *     responses:
 *       200:
 *         description: A JSON object containing the status, timestamp, uptime, memory usage, and environment of the service
 *         schema:
 *           $ref: '#/definitions/Healthcheck'
 */
app.get('/api/healthcheck', healthCheck);

/**
 * @swagger
 * /api/films:
 *   get:
 *     description: Retrieve all films
 *     tags:
 *       - Films
 *     responses:
 *       200:
 *         description: An array of films
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Film'
 */
app.get('/api/films', filmController.findAll);

/**
 * @swagger
 * /api/films/{id}:
 *   get:
 *     description: Retrieve a film by id
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Film id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Film details
 *         schema:
 *           $ref: '#/definitions/Film'
 *       404:
 *         description: Film not found
 */
app.get('/api/films/:id', validateId, filmController.findById);

/**
 * @swagger
 * /api/films:
 *   post:
 *     description: Create a new film
 *     tags:
 *       - Films
 *     parameters:
 *       - in: body
 *         name: film
 *         description: Film object that needs to be created
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Film'
 *     responses:
 *       201:
 *         description: Film created successfully
 *         schema:
 *           $ref: '#/definitions/Film'
 *       400:
 *         description: Invalid request
 */
app.post('/api/films', validateFilm, filmController.create);

/**
 * @swagger
 * /api/films/{id}:
 *   put:
 *     description: Update a film by id
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Film id
 *         required: true
 *         type: string
 *       - in: body
 *         name: film
 *         description: Film data to be updated
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Film'
 *     responses:
 *       200:
 *         description: Film updated successfully
 *         schema:
 *           $ref: '#/definitions/Film'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Film not found
 */
app.put('/api/films/:id', validateId, validateFilm, filmController.update);

/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     description: Delete a film by id
 *     tags:
 *       - Films
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Film id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Film deleted successfully
 *       404:
 *         description: Film not found
 */
app.delete('/api/films/:id', validateId, filmController.remove);

module.exports = app;
