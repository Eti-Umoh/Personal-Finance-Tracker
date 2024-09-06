import express from 'express';
const authRouter = express.Router();
import { login, logOut, changePassword,
    resetPassword, sendResetToken } from './utils.js';


authRouter.post('/login', login);
authRouter.post('/logout', logOut);
authRouter.patch('/password', changePassword);
authRouter.put('/password', resetPassword);
authRouter.post('/sendToken', sendResetToken);

export default authRouter;
