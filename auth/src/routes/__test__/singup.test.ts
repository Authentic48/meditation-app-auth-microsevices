import request from 'supertest';
import { app } from '../../app';

describe('POST /api/auth/register', () => {
  it('returns a 201 on successful signup', () => {
    return request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });
});
