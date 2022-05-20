import supertest from 'supertest';
import app from '../index';

describe('Testing endpoints responses', function () {
  it('1.Home page response', async function () {
    const response = await supertest(app).get('/');
    expect(response.status).toEqual(200);
  });
  it('2.Thumbnails page response', async function () {
    const response = await supertest(app).get('/thumbnail-img');
    expect(response.status).toEqual(200);
  });
  it('3.Gallery page response', async function () {
    const response = await supertest(app).get('/gallery');
    expect(response.status).toEqual(200);
  });
  it('4.Page not found (404)', async function () {
    const response = await supertest(app).get('/any');
    expect(response.status).toEqual(404);
  });
});
