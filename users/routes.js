import express from 'express';
const userRouter = express.Router();
import { createUser } from './utils.js';


userRouter.post('/', createUser);

export default userRouter;
