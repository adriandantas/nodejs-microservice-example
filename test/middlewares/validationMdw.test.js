const filmsFixture = require('../fixtures/films.json');
const { validateFilm } = require('../../src/middlewares/validationMdw');

describe('validateFilm', () => {
  let filmData = {};
  let req;
  let res;
  let next;

  beforeEach(() => {
    filmData = { ...filmsFixture[1] };
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    filmData = {};
    req = null;
    res = null;
    next = null;
  });

  it('accepts valid film payload', () => {
    delete filmData._id;
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(req).toEqual(
      expect.objectContaining({ validatedData: expect.any(Object) }),
    );
  });

  it('reject film payload with _id property', () => {
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects film without title', () => {
    delete filmData.title;
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects film without year', async () => {
    delete filmData.year;
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects film without director', async () => {
    delete filmData.director;
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects film without genre', async () => {
    delete filmData.genre;
    req.body = filmData;
    validateFilm(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
