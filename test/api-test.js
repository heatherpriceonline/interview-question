const request = require('supertest');
const app = require('../index.js');

describe('Testing endpoints', function () {
  it('returns empty slips on initiation', function (done) {
    const response = request(app).get('/boat-slips').send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe([
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
  });

  it('returns a slip number if a slip is avalible when posting a vessel', function (done) {
    const response = request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe({ slipNumber: 1 });
  });

  it('returns a 409 if a slip is not avalible when posting a vessel', function (done) {
    const response = request(app)
      .post('/boat-slips')
      .send({ vesselName: 'U.S.S. Charelston' });

    expect(response.status).toBe(409);
    expect(respoinse.body.status).toBe(409);
    expect(response.body.message).toBe({
      message: 'There are no avaliable boat slips.',
    });
  });

  it('remvoes a vessel from a slip', function (done) {
    const response = request(app).put('/boat-slips/1/vacate');

    expect(response.status).toBe(204);
  });
});
