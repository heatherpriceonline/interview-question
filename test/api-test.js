const request = require('supertest');
const assert = require('assert');
const app = require('../index.js');
const { response } = require('express');

describe('GET /boat-slips', function () {
  it('responds with correct empty boatslips in JSON', function (done) {
    // GET all the boat slips
    request(app)
      .get('/boat-slips')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // check that the slips match the default data
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
    // POST a vessel to a slip
    request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        // assert the first slip is returned
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
    // POST a boat to the remaining slips that have not been cleaned up
    request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        assert(response.body, [
          {
            slipNumber: 2,
          },
        ]);
        // done();
      })
      .catch((err) => done(err));
    request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        assert(response.body, [
          {
            slipNumber: 1,
          },
        ]);
        // done();
      })
      .catch((err) => done(err));
    // attempt to post another boat to a slip
    request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' })
      .set('Accept', 'application/json')
      .expect(409)
      .then((response) => {
        // check that there are no slips available
        assert(response.text, 'There are no available boat slips.');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('PUT /boat-slips', function () {
  it('vacates a vessel from a specific boatslip', function (done) {
    // POST a boat in a slip
    request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' })
      .set('Accept', 'application/json');

    //check that the slip can be vacated
    request(app).put('/boat-slips/1/vacate').expect(204, done);
  });

  it('returns a 409 when a boatslip is empty', function (done) {
    // attempt a vacate
    request(app)
      .put('/boat-slips/1/vacate')
      .set('Accept', 'application/json')
      .expect(409)
      .then((response) => {
        // check that the slip selected is currently vacant
        assert(response.body, 'Boat slip 1 is currently vacant');
        done();
      })
      .catch((err) => done(err));
  });
});
