const express = require('express');
const helmet = require('helmet');
const request = require('supertest');
const { healthCheck } = require('../../src/controllers/healthcheckController');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/healthcheck', healthCheck);

describe('healthcheckController', () => {
  it('should return a 200 status code for GET /healthcheck', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.statusCode).toEqual(200);
  });

  it('should return a JSON object with "status" and "timestamp" properties for GET /healthcheck', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        memoryUsage: expect.objectContaining({
          rss: expect.any(Number),
          heapTotal: expect.any(Number),
          heapUsed: expect.any(Number),
          external: expect.any(Number),
        }),
        env: expect.any(String),
      }),
    );
  });
});
