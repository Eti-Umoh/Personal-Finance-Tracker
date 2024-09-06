import express from 'express';
const authRouter = express.Router();
import { login, logOut, changePassword } from './utils.js';


authRouter.post('/login', login);
authRouter.post('/logout', logOut);
authRouter.patch('/password', changePassword);

export default authRouter;
