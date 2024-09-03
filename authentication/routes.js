import express from 'express';
const authRouter = express.Router();
import { login } from './utils.js';


authRouter.post('/login', login);

export default authRouter;
