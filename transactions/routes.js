import express from 'express';
const router = express.Router();
import { createTransaction } from './utils.js';


router.post('/', createTransaction);