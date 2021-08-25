import request from 'supertest';
import { app } from '../../app';
import { Meditation } from '../../model/meditation';

const createMeditation = () => {
  return request(app)
    .post('/api/meditations/create')
    .set('Cookie', global.signin())
    .send({
      order: 1,
      title: 'Power of Love',
      track: 0,
      subtitle: 'Love and Peace',
      time: 2,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
      image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
    });
};

describe('GET /api/meditations', () => {
  it('can fetch a list of meditations', async () => {
    await createMeditation();
    await createMeditation();
    await createMeditation();

    const response = await request(app)
      .get('/api/meditations')
      .send()
      .expect(200);

    expect(response.body.length).toEqual(3);
  });
});
