import request from 'supertest';
import { app } from '../../app';
import { Meditation } from '../../model/meditation';
import mongoose from 'mongoose';

describe('PUT /api/meditations/:id', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/meditations/${id}`)
      .set('Cookie', global.signin())
      .send({
        order: 2,
        title: 'Power of Love',
        track: 0,
        subtitle: 'Love and Peace',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .put(`/api/meditations/${id}`)
      .send({
        order: 2,
        title: 'Power of Love',
        track: 0,
        subtitle: 'Love and Peace',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(401);
  });

  it('returns a 401 if the user does not own the meditation', async () => {
    const response = await request(app)
      .post('/api/meditations/create')
      .set('Cookie', global.signin())
      .send({
        order: 2,
        title: 'Power of Love',
        track: 0,
        subtitle: 'Love and Peace',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      });

    await request(app)
      .put(`/api/meditations/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
        order: 23,
        title: 'Power of Love edit',
        track: 0,
        subtitle: 'Love and Peace edit',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(401);
  });

  it('returns a 400 if the user provides invalid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post('/api/meditations/create')
      .set('Cookie', cookie)
      .send({
        order: 2,
        title: 'Power of Love',
        track: 0,
        subtitle: 'Love and Peace',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      });

    await request(app)
      .put(`/api/meditations/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        order: 'wfjenu',
        title: 'Power of Love edit',
        track: 0,
        subtitle: 'Love and Peace edit',
        time: 'maljciu',
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(400);
  });

  it('updates the meditation with provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post('/api/meditations/create')
      .set('Cookie', cookie)
      .send({
        order: 2,
        title: 'Power of Love',
        track: 0,
        subtitle: 'Love and Peace',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      });

    await request(app)
      .put(`/api/meditations/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        order: 23,
        title: 'Power of Love edit',
        track: 0,
        subtitle: 'Love and Peace edit',
        time: 3,
        uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.verywellmind.com%2Fwhat-is-meditation-2795927&psig=AOvVaw1vGADMbXibfVtc9sAqy2X-&ust=1629890008397000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiWxc3DyfICFQAAAAAdAAAAABAD',
      })
      .expect(200);
  });
});
