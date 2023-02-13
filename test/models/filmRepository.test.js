const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI ||
  'MONGO_URI=mongodb://localhost:27017/film-microservice';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const Film = require('../../src/models/filmRepository');
const filmModel = require('../../src/models/filmModel');

describe('Film respository', () => {
  const films = [
    {
      _id: '63e95147c0c7a6b974a0a737',
      title: 'The Shawshank Redemption',
      year: 1994,
      genre: 'Drama',
      director: 'Frank Darabont',
    },
    {
      _id: '63e95147c0c7a6b974a0a73a',
      title: 'The Godfather',
      year: 1972,
      genre: 'Crime, Drama',
      director: 'Francis Ford Coppola',
    },
  ];

  async function loadFilms() {
    await filmModel.create(films[0]);
    await filmModel.create(films[1]);
  }

  describe('Film validation', () => {
    let film;

    beforeEach(() => {
      // eslint-disable-next-line prefer-destructuring
      film = { ...films[0] };
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
    it('creates a film', async () => {
      const filmData = { ...films[1] };
      delete filmData._id;
      const res = await Film.create(filmData);
      expect(res).not.toBeNull();
      expect(res.id).not.toEqual(films[0]._id);
      Film.remove(res.id);
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
      const expected = { ...films[0] };
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
      const expected = { ...films[0] };
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
      const expected = { ...films[0] };
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
        const targetId = films[0]._id;
        const res = await Film.remove(targetId);
        expect(res).not.toBeNull();
        expect(res.id).toEqual(targetId);
      });
    });
  });
});
