import request from 'supertest';
import { app } from '../../app';

describe('POST /api/auth/register', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 with invalid email', async () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'testtest.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with invalid password', async () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'pas',
      })
      .expect(400);
  });

  it('returns a 400 with invalid name', async () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: '',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });
});
