import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path, { join } from 'path';

const app = express();
const __dirname = path.resolve();
const clientPath = join(__dirname, '../client/build/');
console.log(clientPath);

// adding Helmet to enhance your API security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(logger('combined'));

// Content-Type parsing
// parse application/json
app.use(bodyParser.json());
// parse text/plain
app.use(bodyParser.text());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// add cookie parser
app.use(cookieParser());

// add public directory
app.use(express.static(clientPath));
app.get('*', function(req, res) {
  res.sendFile(path.join(clientPath, 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
