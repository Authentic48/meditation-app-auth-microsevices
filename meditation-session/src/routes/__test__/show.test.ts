import request from 'supertest';
import { app } from '../../app';
import { Meditation } from '../../model/meditation';
import mongoose from 'mongoose';

describe('POST /api/meditations/:id', () => {
  it('returns a 404 if the meditation is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/api/meditations/{id}`).send().expect(404);
  });

  it("returns a meditation if it's found", async () => {
    const title = 'Power of Love';
    const order = 1;

    const response = await request(app)
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
      })
      .expect(201);

    const meditationResponse = await request(app)
      .get(`/api/meditations/${response.body.id}`)
      .send()
      .expect(200);

    expect(meditationResponse.body.title).toEqual(title);
    expect(meditationResponse.body.order).toEqual(order);
  });
});
