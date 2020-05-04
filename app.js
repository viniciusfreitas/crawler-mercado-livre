const express = require('express');
const app = express();

// const pino = require('pino');
// const expressPino = require('express-pino-logger');

// const logger = pino({
//   level: process.env.LOG_LEVEL || 'debug',
//   prettyPrint: {
//     colorize: true,
//     translateTime: true,
//     errorLikeObjectKeys: ['err', 'error'],
//     ignore: 'pid,hostname',
//   },
// });
// const expressLogger = expressPino({logger});

app.use(express.json());

// app.use(expressLogger);

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

module.exports = app;
