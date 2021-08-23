import request from 'supertest';
import { app } from '../../app';

describe('POST /api/auth/signout ', () => {
  it('clears cookie after signout', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/auth/signout')
      .send({})
      .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
