const mongoose = require('mongoose');

const FilmRepo = require('../../src/models/filmRepository');
const filmModel = require('../../src/models/filmModel');
const filmsFixture = require('../fixtures/films.json');
const mockDb = require('../mock-db');
const FilmModel = require('../../src/models/filmModel');

describe('FilmRepo', () => {
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

  async function loadFilms() {
    await FilmModel.insertMany(filmsFixture);
  }

  describe('validation', () => {
    let film;

    beforeEach(() => {
      // eslint-disable-next-line prefer-destructuring
      film = { ...filmsFixture[0] };
      delete film._id;
    });

    afterEach(() => {
      film = {};
    });

    it('validates complete film objects', () => {
      const res = FilmRepo.validate(film);
      expect(res).not.toHaveProperty('error');
    });

    it('rejects film without title', () => {
      delete film.title;
      const res = FilmRepo.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without year', () => {
      delete film.year;
      const res = FilmRepo.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without director', () => {
      delete film.director;
      const res = FilmRepo.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without genre', () => {
      delete film.genre;
      const res = FilmRepo.validate(film);
      expect(res).toHaveProperty('error');
    });
  });

  describe('create', () => {
    it('creates a new film', async () => {
      const filmData = { ...filmsFixture[1] };
      delete filmData._id;
      const res = await FilmRepo.create(filmData);
      expect(res).not.toBeNull();
      expect(res.id).not.toBeNull();
    });

    it('creates a film with _id', async () => {
      const filmData = { ...filmsFixture[1] };
      const res = await FilmRepo.create(filmData);
      expect(res).not.toBeNull();
      expect(res.id).toEqual(filmData._id);
    });
  });

  describe('findAll', () => {
    afterEach(async () => {
      await filmModel.deleteMany({});
    });

    it('returns empty array on empty repository', async () => {
      await filmModel.deleteMany({});
      const res = await FilmRepo.findAll();
      expect(res).not.toBeNull();
      expect(res).toHaveLength(0);
    });

    it('return collection when available', async () => {
      await loadFilms();
      const res = await FilmRepo.findAll();
      expect(res).not.toBeNull();
      expect(res).toHaveLength(2);
    });
  });

  describe('findById', () => {
    beforeEach(async () => {
      await loadFilms();
    });

    afterEach(async () => {
      await filmModel.deleteMany({});
    });

    it('finds existing object', async () => {
      const expected = { ...filmsFixture[0] };
      const res = await FilmRepo.findById(expected._id);
      expect(res).not.toBeNull();
      expect(res.id).toEqual(expected._id);
      expect(res.title).toEqual(expected.title);
      expect(res.year).toEqual(expected.year);
      expect(res.genre).toEqual(expected.genre);
      expect(res.director).toEqual(expected.director);
    });

    it('returns null on non existing object id', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await FilmRepo.findById(nonExistentId);
      expect(res).toBeNull();
    });

    it('throw error on invalid object id', async () => {
      const nonExistentId = 'NON_EXISTENT_ID';
      try {
        await FilmRepo.findById(nonExistentId);
        fail('Failed throwing error');
      } catch (e) {
        expect(e).not.toBeNull();
      }
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await loadFilms();
    });

    afterEach(async () => {
      await filmModel.deleteMany({});
    });

    it('update existing object', async () => {
      const fixture = { ...filmsFixture[0] };
      fixture.director = 'Frank Castle';

      const res = await FilmRepo.update(fixture);
      expect(res).not.toBeNull();
      expect(res.id).toEqual(fixture._id);
      expect(res.title).toEqual(fixture.title);
      expect(res.year).toEqual(fixture.year);
      expect(res.genre).toEqual(fixture.genre);
      expect(res.director).toEqual(fixture.director);
    });

    it('return null on update non-existent object', async () => {
      const expected = { ...filmsFixture[0] };
      // New non-existent id.
      expected._id = mongoose.Types.ObjectId().toString();
      expected.director = 'Frank Castle';
      const res = await FilmRepo.update(expected);
      expect(res).toBeNull();
    });
  });

  describe('remove', () => {
    it('fails on removal of non-existent object', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      try {
        await FilmRepo.remove(nonExistentId);
        fail('failed to raise exception on removal of non-existent object');
      } catch (e) {
        expect(e).not.toBeNull();
      }
    });

    describe('removal of existing object', () => {
      beforeEach(async () => {
        await loadFilms();
      });

      afterEach(async () => {
        await filmModel.deleteMany({});
      });

      it('removes existing object', async () => {
        const targetId = filmsFixture[0]._id;
        const res = await FilmRepo.remove(targetId);
        expect(res).not.toBeNull();
        expect(res.id).toEqual(targetId);
      });
    });
  });
});
