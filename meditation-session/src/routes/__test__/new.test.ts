import request from 'supertest';
import { app } from '../../app';
import { Meditation } from '../../model/meditation';

describe('POST /api/meditations/create', () => {
  it('has a route handler listening on to /api/meditations/create for posts request', async () => {
    const response = await request(app)
      .post('/api/meditations/create')
      .send({});

    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/meditations/create').send({}).expect(401);
  });

  it('return an error with empty inputs ', async () => {
    const response = await request(app)
      .post('/api/meditations/create')
      .set('Cookie', global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it('return an error with invalid inputs', async () => {
    await request(app)
      .post('/api/meditations/create')
      .set('Cookie', global.signin())
      .send({
        order: 'khgtyv',
        title: 'Power of Love edit',
        track: 0,
        subtitle: 'Love and Peace',
        time: 'bkhyit',
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(400);
  });

  it('creates a meditation with valid inputs', async () => {
    await request(app)
      .post('/api/meditations/create')
      .set('Cookie', global.signin())
      .send({
        order: 1,
        title: 'Power of Love edit',
        track: 0,
        subtitle: 'Love and Peace',
        time: 2,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(201);
  });
});
