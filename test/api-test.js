const request = require('supertest');
const assert = require('assert');
const app = require('../index.js');

describe('GET /boat-slips', function () {
  it('responds with correct empty boatslips in JSON', function (done) {
    request(app)
      .get('/boat-slips')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert(response.body, [
          {
            slipNumber: 1,
            vacant: true,
          },
          {
            slipNumber: 2,
            vacant: true,
          },
          {
            slipNumber: 3,
            vacant: true,
          },
        ]);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /boat-slips', function () {
  it('posts a vessel to a boatslip', function (done) {
    request(app)
      .post('/boat-slips')
      .field('vesselName', 'U.S.S. Charelston')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert(response.body, [
          {
            slipNumber: 1,
          },
        ]);
        done();
      })
      .catch((err) => done(err));
  });
  it('cannot post a vessel to a boatslip and returns a 409', function (done) {
    request(app)
      .post('/boat-slips')
      .field('vesselName', 'U.S.S. Charelston')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        assert(response.body.message, 'There are no available boat slips.');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('PUT /boat-slips', function () {
  it('vacates a vessel from a specific boatslip', function (done) {
    request(app)
      .put('/boat-slips/1/vacate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204, done);
  });
  it('returns a 409 when a boatslip is empty', function (done) {
    request(app)
      .put('/boat-slips/1/vacate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        assert(response.body.message, 'Boat slip 1 is currently vacant');
        done();
      })
      .catch((err) => done(err));
  });
});
