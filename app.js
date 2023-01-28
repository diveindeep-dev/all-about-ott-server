if (process.env.NODE_ENV === 'development') {
  console.log('DEV MODE!');
}
import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { CLIENT_URL } from './config/index.js';
import indexRouter from './routes/index.js'

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: CLIENT_URL,
  Credential: true,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World: ALL ABOUT OTT');
});

app.use('/api', indexRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
