import express from 'express'
import logger from './middlewares/logger.js';
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js';

const port = process.env.PORT || 8000;
const app = express()

// Body parser middleware
app.use(express.json());


// middleWares
app.use(logger)


// Routes
app.use('/api/posts', posts);


// errorHandlers
app.use(notFound);
app.use(errorHandler);


app.listen(8000, () => console.log(`Server is running on port ${port}`))