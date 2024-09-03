import express from 'express';
const transactionRouter = express.Router();
import { createTransaction } from './utils.js';


transactionRouter.post('/', createTransaction);

export default transactionRouter;