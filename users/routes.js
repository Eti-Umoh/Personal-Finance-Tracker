import express from 'express';
const userRouter = express.Router();
import { createUser } from './utils.js';


userRouter.post('/signup', createUser);

export default userRouter;
