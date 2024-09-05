import express from 'express';
const transactionRouter = express.Router();
import { createTransaction, getAllTransactions,
    updateTransaction, deleteTransaction } from './utils.js';


transactionRouter.post('/', createTransaction);
transactionRouter.get('/', getAllTransactions);
transactionRouter.put('/:txnId', updateTransaction);
transactionRouter.delete('/:txnId', deleteTransaction);

export default transactionRouter;
