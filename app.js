/* eslint-disable no-unused-vars */
const httpContext = require('express-http-context');
const createError = require('http-errors');
const express = require('express');
const debug = require('debug')('product-api:app');
const helmet = require('helmet');
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
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(httpContext.middleware);

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  const requestId = req.headers['kong-request-id'];
  httpContext.set('requestId', requestId);
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

app.use(express.json());

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
    const code = err.statusCode ? err.statusCode : 500;
    if (err.statusCode) {
      errorResponse = {
        status: false,
        error: err.message,
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
