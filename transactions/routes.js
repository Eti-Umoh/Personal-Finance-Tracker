import express from 'express';
const transactionRouter = express.Router();
import { createTransaction } from './utils.js';


router.post('/', createTransaction);

export default transactionRouter;