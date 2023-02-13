const request = require('supertest');
const mongoose = require('mongoose');
const mockDb = require('../mock-db');
const app = require('../../src/app');
const FilmModel = require('../../src/models/filmModel');
const FilmRepo = require('../../src/models/filmRepository');
const filmsFixture = require('../fixtures/films.json');

describe('filmController', () => {
  beforeAll(async () => {
    await mockDb.connect();
    const filmsResult = JSON.parse(JSON.stringify(filmsFixture));
    for (let idx = 0; idx < filmsResult.length; idx += 1) {
      filmsResult[idx].id = filmsResult[idx]._id;
      delete filmsResult[idx]._id;
    }
  });

  afterAll(async () => {
    await mockDb.disconnect();
  });

  afterEach(async () => {
    await FilmModel.deleteMany({});
  });

  describe('GET /films', () => {
    it('returns a list of films', async () => {
      await FilmModel.insertMany(filmsFixture);

      const res = await request(app).get('/films');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body).toEqual(expect.arrayContaining(filmsFixture));
    });
  });

  describe('GET /films/:id', () => {
    it('returns a film by its ID', async () => {
      const data = {
        title: 'The Dark Knight',
        year: 2008,
        genre: 'Action, Crime, Drama',
        director: 'Christopher Nolan',
      };
      const film = await FilmRepo.create(data);
      const res = await request(app).get(`/films/${film._id}`);
      const expected = { ...data, _id: film._id.toString() };

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expected);
    });

    it('returns a 404 error if the film is not found', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await request(app).get(`/films/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        error: 'Not found',
        message: 'The film with the given ID was not found.',
      });
    });
  });

  describe('POST /films', () => {
    it('creates a new film', async () => {
      const data = {
        title: 'The Matrix',
        year: 1999,
        genre: 'Action, Sci-Fi',
        director: 'Lilly and Lana Wachowski ',
      };

      const res = await request(app).post('/films').send(data);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        _id: expect.any(String),
        ...data,
      });

      const savedFilm = await FilmModel.findById(res.body._id);
      expect(savedFilm.id).toBe(res.body._id);
      expect(savedFilm.title).toBe(data.title);
      expect(savedFilm.year).toBe(data.year);
      expect(savedFilm.genre).toBe(data.genre);
      expect(savedFilm.director).toBe(data.director);
    });

    it('returns a 400 error if required fields are missing', async () => {
      const film = { title: 'The Matrix' };
      const res = await request(app).post('/films').send(film);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    });
  });

  describe('PUT /films/:id', () => {
    it('Fails on non-existent ID', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const data = { ...filmsFixture[0] };
      delete data._id;
      const res = await request(app).put(`/films/${nonExistentId}`).send(data);
      expect(res.statusCode).toBe(404);
    });

    it('Fails on empty body', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await request(app).put(`/films/${nonExistentId}`).send();
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    });

    it('updates an existing film', async () => {
      const filmData = { ...filmsFixture[0] };
      delete filmData._id;
      const film = await FilmRepo.create(filmData);

      const data = {
        title: 'The Matrix Reloaded',
        year: 2003,
        genre: 'Action, Sci-Fi',
        director: 'Lilly and Lana Wachowski ',
      };

      const res = await request(app).put(`/films/${film.id}`).send(data);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(film.id);
      expect(res.body.title).toBe(data.title);
      expect(res.body.year).toBe(data.year);
      expect(res.body.genre).toBe(data.genre);
      expect(res.body.director).toBe(data.director);

      const savedFilm = await FilmModel.findById(film._id);
      expect(savedFilm.id).toBe(film.id);
      expect(savedFilm.title).toBe(data.title);
      expect(savedFilm.year).toBe(data.year);
      expect(savedFilm.genre).toBe(data.genre);
      expect(savedFilm.director).toBe(data.director);
    });

    it('returns a 400 error if required fields are missing', async () => {
      const filmData = { ...filmsFixture[0] };
      delete filmData._id;
      const film = await FilmRepo.create(filmData);
      const data = { title: 'The Matrix Reloaded' };
      const res = await request(app).put(`/films/${film.id}`).send(data);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'Invalid request',
        message: 'All fields are required',
      });
    });
  });

  describe('DELETE /films/:id', () => {
    it('deletes an existing film', async () => {
      const data = { ...filmsFixture[0] };
      delete data._id;
      const film = await FilmRepo.create(data);
      const res = await request(app).delete(`/films/${film._id}`);
      expect(res.statusCode).toBe(204);
      const savedFilm = await FilmModel.findById(data._id);
      expect(savedFilm).toBeNull();
    });
  });
});
