const request = require('supertest');
const app = require('../server');
require('dotenv').config();

describe('GET endpoint', () => {
  it('should rerieve status code 200', async () => {
    const res = await request(app)
      .get('/api/server-info');
    expect(res.statusCode).toEqual(200);
    expect(typeof(res.body)).toBe('object')
  });
});

describe('POST endpoint', () => {
  it('should deny access to unauthorized users', async () => {
    const res = await request(app)
      .post('/api/send-message')
      .set('usertoken', '123123123')
      .send({
        "channelID": `${process.env.CHANNEL_ID}`,
        "message": "some dummy text"
      });
    expect(res.statusCode).toEqual(401);
  });

  it('should deny access if channel id is wrong', async () => {
    const res = await request(app)
      .post('/api/send-message')
      .set('usertoken', `${process.env.USER_TOKEN}`)
      .send({
        "channelID": "43291105367",
        "message": "some more dummy text"
      });
    expect(res.statusCode).toEqual(404);
  });

});