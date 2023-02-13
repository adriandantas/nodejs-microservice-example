const request = require('supertest');
const mockDb = require('../mock-db');
const app = require('../../src/app');
const Film = require('../../src/models/filmModel');
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
    await Film.deleteMany({});
  });

  describe('GET /films', () => {
    it('returns a list of films', async () => {
      await Film.insertMany(filmsFixture);

      const res = await request(app).get('/films');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body).toEqual(expect.arrayContaining(filmsFixture));
    });
  });

  // describe('GET /films/:id', () => {
  //   it('returns a film by its ID', async () => {
  //     const film = new Film({
  //       title: 'The Dark Knight',
  //       year: 2008,
  //       genre: 'Action, Crime, Drama',
  //       summary:
  //         'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
  //     });
  //     await film.save();
  //
  //     const res = await request(app).get(`/films/${film._id}`);
  //
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toEqual({
  //       _id: film._id.toString(),
  //       title: 'The Dark Knight',
  //       year: 2008,
  //       genre: 'Action, Crime, Drama',
  //       summary:
  //         'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
  //     });
  //   });
  //
  //   it('returns a 404 error if the film is not found', async () => {
  //     const res = await request(app).get(`/films/NON_EXISTANT_ID`);
  //     expect(res.statusCode).toBe(404);
  //     expect(res.body).toEqual({ message: 'Film not found' });
  //   });
  // });
  //
  // describe('POST /films', () => {
  //   it('creates a new film', async () => {
  //     const film = {
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     };
  //
  //     const res = await request(app).post('/films').send(film);
  //
  //     expect(res.statusCode).toBe(201);
  //     expect(res.body).toEqual({
  //       _id: expect.any(String),
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     });
  //
  //     const savedFilm = await Film.findById(res.body._id);
  //     expect(savedFilm).toEqual({
  //       _id: expect.any(mongoose.Types.ObjectId),
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     });
  //   });
  //
  //   it('returns a 400 error if required fields are missing', async () => {
  //     const film = { title: 'The Matrix' };
  //
  //     const res = await request(app).post('/films').send(film);
  //
  //     expect(res.statusCode).toBe(400);
  //     expect(res.body).toEqual({ message: 'All fields are required' });
  //   });
  // });
  //
  // describe('PUT /films/:id', () => {
  //   it('updates an existing film', async () => {
  //     const film = new Film({
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     });
  //     await film.save();
  //
  //     const updatedFilm = {
  //       title: 'The Matrix Reloaded',
  //       year: 2003,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'Neo and the rebel leaders estimate that they have 72 hours until 250,000 probes discover Zion and destroy it and its inhabitants.',
  //     };
  //
  //     const res = await request(app)
  //       .put(`/films/${film._id}`)
  //       .send(updatedFilm);
  //
  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toEqual({
  //       _id: film._id.toString(),
  //       title: 'The Matrix Reloaded',
  //       year: 2003,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'Neo and the rebel leaders estimate that they have 72 hours until 250,000 probes discover Zion and destroy it and its inhabitants.',
  //     });
  //
  //     const savedFilm = await Film.findById(film._id);
  //     expect(savedFilm).toEqual({
  //       _id: film._id,
  //       title: 'The Matrix Reloaded',
  //       year: 2003,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'Neo and the rebel leaders estimate that they have 72 hours until 250,000 probes discover Zion and destroy it and its inhabitants.',
  //     });
  //   });
  //
  //   it('returns a 400 error if required fields are missing', async () => {
  //     const film = new Film({
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     });
  //     await film.save();
  //
  //     const updatedFilm = { title: 'The Matrix Reloaded' };
  //
  //     const res = await request(app)
  //       .put(`/films/${film._id}`)
  //       .send(updatedFilm);
  //
  //     expect(res.statusCode).toBe(400);
  //     expect(res.body).toEqual({ message: 'All fields are required' });
  //   });
  // });
  //
  // describe('DELETE /films/:id', () => {
  //   it('deletes an existing film', async () => {
  //     const film = new Film({
  //       title: 'The Matrix',
  //       year: 1999,
  //       genre: 'Action, Sci-Fi',
  //       summary:
  //         'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  //     });
  //     await film.save();
  //
  //     const res = await request(app).delete(`/films/${film._id}`);
  //
  //     expect(res.statusCode).toBe(204);
  //
  //     const savedFilm = await Film.findById(film._id);
  //     expect(savedFilm).toBeNull();
  //   });
  // });
});
