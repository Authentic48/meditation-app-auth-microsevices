import mongoose from 'mongoose';

interface MeditationAttrs {
  title: string;
  subtitle: string;
  order: number;
  track: number;
  time: number;
  uri: string;
  image: string;
  userId: string;
}

interface MeditationDoc extends mongoose.Document {
  title: string;
  subtitle: string;
  order: number;
  track: number;
  time: number;
  uri: string;
  image: string;
  userId: string;
}

interface MeditationModel extends mongoose.Model<MeditationDoc> {
  build(attrs: MeditationAttrs): MeditationDoc;
}

const meditationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    order: {
      type: Number,
      require: true,
    },
    track: {
      type: Number,
      require: true,
    },
    time: {
      type: Number,
      require: true,
    },
    uri: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

meditationSchema.statics.build = (attrs: MeditationAttrs) => {
  return new Meditation(attrs);
};

const Meditation = mongoose.model<MeditationDoc, MeditationModel>(
  'Meditation',
  meditationSchema
);

export { Meditation };
