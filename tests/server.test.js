const request = require('supertest');
const { app, client } = require('../server.js');
require('dotenv').config();


describe('API Tests', () => {
  let server; //configures server before the tests
  beforeAll(async () => {
    server = app.listen(process.env.PORT || 3000);
  });
  afterAll(async () => {
    server.close();
  });

  // Test for GET route: /api/server-info
  it('should return server info', async () => {
    //Spy on the function that gets the guild
    const guild = {
      name: 'Test Guild',
      memberCount: 2,
      available: true,
      createdAt: new Date('2020-01-01'),
      id: 'test-id',
      members: {
        fetch: jest.fn(),
        cache: [
          { user: { username: 'User1' } },
          { user: { username: 'User2' } }
        ]
      }
    };
    jest.spyOn(client.guilds.cache, 'first').mockReturnValue(guild);

    const response = await request(app).get('/api/server-info');
    expect(response.status).toBe(200);
    expect(response.body.serverName).toBe('Test Guild');
    expect(response.body.memberCount).toBe(2);
    expect(response.body.isAvailable).toBe(true);
    expect(response.body.id).toBe('test-id');
    expect(response.body.memberNames).toEqual(['User1', 'User2']);
  });

  // Test for POST route: /api/send-message
  it('should send a message to the specified channel', async () => {
    const channel = {
      send: jest.fn().mockResolvedValue(true)
    };
    jest.spyOn(client.channels.cache, 'get').mockReturnValue(channel);

    const response = await request(app)
      .post('/api/send-message')
      .set('usertoken', process.env.USER_TOKEN)
      .send({
        channelID: process.env.CHANNEL_ID,
        message: 'Test Message'
      });

    expect(response.status).toBe(200);
    expect(response.body).toBe('message sent');
  });

  it('should return 401 if user token is invalid', async () => {
    const response = await request(app)
      .post('/api/send-message')
      .set('usertoken', 'invalid-token')
      .send({
        channelID: process.env.CHANNEL_ID,
        message: 'Test Message'
      });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  it('should return 404 if channel ID is wrong', async () => {
    const response = await request(app)
      .post('/api/send-message')
      .set('usertoken', process.env.USER_TOKEN)
      .send({
        channelID: 'wrong-channel-id',
        message: 'Test Message'
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe('wrong text channel');
  });
});