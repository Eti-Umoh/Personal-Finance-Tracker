import express from 'express';
const transactionRouter = express.Router();
import { createTransaction, getAllTransactions } from './utils.js';


transactionRouter.post('/', createTransaction);
transactionRouter.get('/', getAllTransactions);

export default transactionRouter;