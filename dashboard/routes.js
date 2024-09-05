import express from 'express';
const dashboardRouter = express.Router();
import { getStats } from './utils.js';


dashboardRouter.get('/', getStats);

export default dashboardRouter;
