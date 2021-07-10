/* eslint-disable no-unused-vars */
const createError = require('http-errors');
const express = require('express');
const debug = require('debug')('todo-api:app');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const pjson = require('./package.json');
const Constant = require('./utilities/constant');

const app = express();
require('express-async-errors');

app.use(helmet());
const sixtyDaysInSeconds = 5184000;
app.use(
  helmet.hsts({
    maxAge: sixtyDaysInSeconds,
  })
);

// Sets "Referrer-Policy: origin,"
app.use(
  helmet.referrerPolicy({
    policy: 'origin',
  })
);

app.use((req, res, next) => {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With,Content-Type,Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
  }
  return next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// To remove data, use:
app.use(mongoSanitize());

// show version on home route
app.get('/', (req, res) => {
  res.json({ version: pjson.version });
});
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  debug(`error: ${err} ${err.statusCode}`);
  let errorResponse;
  if (err.name) {
    const code = err?.statusCode ? err.statusCode : 500;
    if (err.statusCode) {
      errorResponse = {
        status: false,
        error: err?.message,
        code,
      };
    } else {
      errorResponse = {
        status: false,
        error: Constant.labelList.invalidInput,
        code,
      };
    }
  }
  if (errorResponse) {
    res.status(errorResponse.code).json(errorResponse);
  } else {
    next();
  }
});
module.exports = app;
