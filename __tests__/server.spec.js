import "@babel/polyfill";

const app = require('../src/server/app.js');
const request = require('supertest');

describe('Get function', () => {
    test('it should return a status of 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});