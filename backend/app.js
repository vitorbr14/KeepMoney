require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authMiddleware = require('./middleware/authentication')
const app = express();

// connectDB
const connectDB = require('./db/connect')
//routers
const authRouter = require('./routes/auth')
const valueRouter = require('./routes/value')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/values', authMiddleware, valueRouter)

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
