import express from 'express'
import logger from './middlewares/logger.js';
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js';
import updateDb from './dbmigration.js';
import transactionRouter from './transactions/routes.js';
import userRouter from './users/routes.js';
import authRouter from './authentication/routes.js';

const port = process.env.PORT || 8000;
const app = express();


// Run database update
(async () => {
    await updateDb();
})();


// middleWares
app.use(express.json());
app.use(logger);


// Routes
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);


// errorHandlers
app.use(notFound);
app.use(errorHandler);


app.listen(8000, () => console.log(`Server is running on port ${port}`))