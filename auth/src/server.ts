import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler'
import { NotFoundError } from './errors/notFoundError';


dotenv.config();

const app = express();

app.get('/api/auth/login', (req, res) => {
  return res.json('Its  working with ingress!!!!');
});

app.all('*', ()=> {
  throw new NotFoundError()
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App in ${process.env.NODE_ENV} is running on ${PORT}`);
});
