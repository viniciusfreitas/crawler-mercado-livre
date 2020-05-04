const cheerio = require('cheerio');
const checkValues = require('./checkValeus');

const readPage = function(body, limit) {
  const $ = cheerio.load(body);
  const products = [];
  $('#searchResults li.results-item').each(function() {
    if (products.length >= limit) return false;

    const name = $(this).find('.main-title').text().trim();
    const link = $(this).find('a').attr('href');
    const store = $(this).find('.item__brand-title-tos').text().trim();
    const state = $(this).find('.item__condition').text().trim();

    const priceFraction = $(this).find('.price__fraction').text().trim();
    let priceDecimals = $(this).find('.price__decimals').text().trim();
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
};

module.exports = readPage;
