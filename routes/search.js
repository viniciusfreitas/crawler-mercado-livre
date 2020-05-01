const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const router = express.Router()

router.post('/', async (req, response) => {
    const search = req.body.search
    const limit  = req.body.limit
    const url    = `https://lista.mercadolivre.com.br/${search}`

    request(url, (err, res, body) => {
        if (err) {
            console.error(err)
            response.status(400).json({ "erro" : err, "message" : "Ocorreu um erro ao ler a página." })
        }
        let result = readPage(body, limit)
        response.status(200).json(result)
    })

})

function readPage(body, limit) {

    const $ = cheerio.load(body)

    let products = []
    $('#searchResults li.results-item').each(function(){
        if (products.length >= limit) return false;

        let name = $(this).find('.main-title').text().trim()
        let link = $(this).find('a').attr('href')
        let store = $(this).find('.item__brand-title-tos').text().trim()
        let state = $(this).find('.item__condition').text().trim()

        let price_symbol = $(this).find('.price__symbol').text().trim()
        let price_fraction = $(this).find('.price__fraction').text().trim()
        let price_decimals = $(this).find('.price__decimals').text().trim()
        if(price_decimals == '') price_decimals = '00'
        let price = price_symbol + ' ' + price_fraction + ',' + price_decimals

        let item = {
            "name" : name,
            "link" : link,
            "price" : price,
            "store" : store,
            "state" : state
        }
        item = checkValues(item)
        products.push(item)
    })
    return products
}

function checkValues(item){
    if(item.state !== '') {
        item.state.replace('Usado - ', '')
        item.state.replace('Novo - ', '')
    } else {
        item.state = null
    }
    if(item.store !== '') {
        item.store = item.store.replace('por ', '')
    } else {
        item.store = null
    }
    return item
}

module.exports = router;