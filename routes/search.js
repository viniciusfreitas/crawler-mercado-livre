/* eslint-disable require-jsdoc */
const request = require('request');
const express = require('express');
const readPage = require('../methods/readPage');

const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    colorize: true,
    translateTime: true,
    errorLikeObjectKeys: ['err', 'error'],
    ignore: 'pid,hostname',
  },
});

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, response) => {
  const search = req.body.search;
  const limit = req.body.limit;
  const url = `https://lista.mercadolivre.com.br/${search}`;

  logger.info(`Searched word: ${search}`);

  request(url, (err, res, body) => {
    if (err) {
      logger.error(err);

      response.status(400).json({
        'erro': err,
        'message': 'Ocorreu um erro ao ler a página.',
      });
      return;
    }

    const result = readPage(body, limit);
    logger.info('Calling res.send');
    response.status(200).json(result);
  });
});

module.exports = router;
