import express from 'express';
import { CustomError } from '../errors/customError';



const router = express.Router()

router.post('/api/auth/register', (req, res) =>{

   res.json('it\'s working!!!!!')
})

export { router as signUp } 