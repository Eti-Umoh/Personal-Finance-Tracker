import express from 'express';
const transactionRouter = express.Router();
import { createTransaction, getAllTransactions, updateTransaction } from './utils.js';


transactionRouter.post('/', createTransaction);
transactionRouter.get('/', getAllTransactions);
transactionRouter.put('/:txnId', updateTransaction);

export default transactionRouter;