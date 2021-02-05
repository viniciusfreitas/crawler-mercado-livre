const express = require('express');
const app = express();

app.use(express.json());

const searchRouter = require('./routes/search');

app.use('/search', searchRouter);

module.exports = app;
