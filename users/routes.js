import express from 'express';
const userRouter = express.Router();
import { createUser, getCurrentUser, updateUser } from './utils.js';


userRouter.post('/signup', createUser);
userRouter.get('/', getCurrentUser);
userRouter.put('/', updateUser);

export default userRouter;
