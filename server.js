import express from 'express'
import logger from './middlewares/logger.js';
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js';
import updateDb from './dbmigration.js';

const port = process.env.PORT || 8000;
const app = express()


//dbUpdate
app.use(updateDb);


// middleWares
app.use(express.json());
app.use(logger);


// Routes
app.use('/api/v1', posts);


// errorHandlers
app.use(notFound);
app.use(errorHandler);


app.listen(8000, () => console.log(`Server is running on port ${port}`))