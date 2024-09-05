import express from 'express';
const userRouter = express.Router();
import { createUser, getCurrentUser,
    updateUser, deleteUser } from './utils.js';


userRouter.post('/signup', createUser);
userRouter.get('/', getCurrentUser);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter;
