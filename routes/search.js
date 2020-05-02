/* eslint-disable require-jsdoc */
const request = require('request');
const cheerio = require('cheerio');
// const fs = require('fs')
const express = require('express');

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

  logger.info(`Searched term: ${search}`);

  request(url, (err, res, body) => {
    if (err) {
      // logError(err)
      logger.error(err);
      // eslint-disable-next-line max-len
      response.status(400).json({'erro': err, 'message': 'Ocorreu um erro ao ler a página.'});
      return;
    }
    // logSearch(search, null)
    const result = readPage(body, limit);
    logger.info('Calling res.send');
    response.status(200).json(result);
  });
});

function readPage(body, limit) {
  const $ = cheerio.load(body);
  const products = [];
  $('#searchResults li.results-item').each(function() {
    if (products.length >= limit) return false;

    const name = $(this).find('.main-title').text().trim();
    const link = $(this).find('a').attr('href');
    const store = $(this).find('.item__brand-title-tos').text().trim();
    const state = $(this).find('.item__condition').text().trim();

    const priceFraction = $(this).find('.price__fraction').text().trim();
    const priceDecimals = $(this).find('.price__decimals').text().trim();
    if (priceDecimals == '') priceDecimals = '00';
    const price = parseFloat(priceFraction + '.' + priceDecimals);

    let item = {
      'name': name,
      'link': link,
      'price': price,
      'store': store,
      'state': state,
    };

    item = checkValues(item);
    products.push(item);
  });
  return products;
}

function checkValues(item) {
  if (item.state !== '') {
    item.state.replace('Usado - ', '');
    item.state.replace('Novo - ', '');
  } else {
    item.state = null;
  }
  if (item.store !== '') {
    item.store = item.store.replace('por ', '');
  } else {
    item.store = null;
  }
  return item;
}

// function getTime() {
//     let current_datetime = new Date()
// eslint-disable-next-line max-len
//     return current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
// }

// function logSearch(name) {
//     let now = getTime()
// eslint-disable-next-line max-len
//     fs.appendFile('search_log.txt', `${now} - Produto pesquisado: "${name}"; \n`, (err) => {
//         if(err) throw err
//     })
// }

// function logError(error) {
//     console.error(error)
//     let now = getTime()
//     fs.appendFile('error_log.txt', `${now} - ${error}; \n`, (err) => {
//         if(err) throw err
//         console.error(err)
//     })
// }

module.exports = router;
