import express from 'express';
const userRouter = express.Router();
import { createUser, getCurrentUser } from './utils.js';


userRouter.post('/signup', createUser);
userRouter.get('/', getCurrentUser);

export default userRouter;
