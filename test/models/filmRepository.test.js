const mongoose = require('mongoose');
const mockDb = require('../mock-db');

const Film = require('../../src/models/filmRepository');
const filmModel = require('../../src/models/filmModel');
const filmsFixture = require('../fixtures/films.json');

describe('Film respository', () => {
  beforeAll(async () => {
    await mockDb.connect();
  });

  afterAll(async () => {
    await mockDb.disconnect();
  });

  afterEach(async () => {
    await filmModel.deleteMany({});
  });

  async function loadFilms() {
    await filmModel.create(filmsFixture[0]);
    await filmModel.create(filmsFixture[1]);
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
      const res = Film.validate(film);
      expect(res).not.toHaveProperty('error');
    });

    it('rejects film without title', () => {
      delete film.title;
      const res = Film.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without year', () => {
      delete film.year;
      const res = Film.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without director', () => {
      delete film.director;
      const res = Film.validate(film);
      expect(res).toHaveProperty('error');
    });

    it('rejects film without genre', () => {
      delete film.genre;
      const res = Film.validate(film);
      expect(res).toHaveProperty('error');
    });
  });

  describe('create', () => {
    it('creates a new film', async () => {
      const filmData = { ...filmsFixture[1] };
      delete filmData._id;
      const res = await Film.create(filmData);
      expect(res).not.toBeNull();
      expect(res.id).not.toBeNull();
    });

    it('creates a film with _id', async () => {
      const filmData = { ...filmsFixture[1] };
      const res = await Film.create(filmData);
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
      const res = await Film.findAll();
      expect(res).not.toBeNull();
      expect(res).toHaveLength(0);
    });

    it('return collection when available', async () => {
      await loadFilms();
      const res = await Film.findAll();
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
      const res = await Film.findById(expected._id);
      expect(res).not.toBeNull();
      expect(res.id).toEqual(expected._id);
      expect(res.title).toEqual(expected.title);
      expect(res.year).toEqual(expected.year);
      expect(res.genre).toEqual(expected.genre);
      expect(res.director).toEqual(expected.director);
    });

    it('returns null on non existing object', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await Film.findById(nonExistentId);
      expect(res).toBeNull();
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
      const expected = { ...filmsFixture[0] };
      expected.id = expected._id;
      expected.director = 'Frank Castle';
      delete expected._id;

      const res = await Film.update(expected);
      expect(res).not.toBeNull();
      expect(res.id).toEqual(expected.id);
      expect(res.title).toEqual(expected.title);
      expect(res.year).toEqual(expected.year);
      expect(res.genre).toEqual(expected.genre);
      expect(res.director).toEqual(expected.director);
    });

    it('fail on update non-existent object', async () => {
      const expected = { ...filmsFixture[0] };
      // New non-existent id.
      expected.id = mongoose.Types.ObjectId();
      expected.director = 'Frank Castle';
      delete expected._id;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Film.update(expected);
        fail('failed to raise exception on update of non-existent object');
      } catch (e) {
        expect(e).not.toBeNull();
      }
    });
  });

  describe('remove', () => {
    it('fails on removal of non-existent object', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      try {
        await Film.remove(nonExistentId);
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
        const res = await Film.remove(targetId);
        expect(res).not.toBeNull();
        expect(res.id).toEqual(targetId);
      });
    });
  });
});
