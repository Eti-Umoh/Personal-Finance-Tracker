import express from 'express';
const authRouter = express.Router();
import { login, logOut } from './utils.js';


authRouter.post('/login', login);
authRouter.post('/logout', logOut);

export default authRouter;
