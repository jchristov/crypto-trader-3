const debug = require('debug')('trader:gdax');

var express = require('express');
var router = express.Router();

/**
 * Get the authentication from environment variables
 */
const key = process.env.GDAX_KEY;
const secret = process.env.GDAX_SECRET;
const passPhrase = process.env.GDAX_PASSPHRASE;
const apiUrl = process.env.GDAX_API_URL;

//const apiURI = 'https://api.gdax.com';
//const sandboxURI = 'https://api-public.sandbox.gdax.com';

debug('GDAX API: %s', apiUrl)
debug('GDAX Key: %s', key)
debug('GDAX_SECRET: %s', secret)
debug('GDAX PassPhrase: %s', passPhrase)

const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const authedClient = new Gdax.AuthenticatedClient(
    key,
    secret,
    passPhrase,
    apiUrl
);

/**
 * Index page
 */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

/**
 * Get the products offered by the exchange
 */
router.get('/products', function (req, res, next) {

    publicClient.getProducts()
        .then(data => {
            console.log(data);
            res.render('products', { data: data, title: 'Products' });
        })
        .catch(error => {
            res.render('error', { message: "Error getting products", error: error });
        });

});

/**
 * Get the ticker information for a product
 */
router.get('/product-ticker/:product', function (req, res, next) {
    var productCode = req.params.product;

    publicClient.getProductTicker(productCode)
        .then(data => {
            // console.log(data);
            res.render('product-ticker', { data: data, title: 'Ticker : ' + productCode });
        })
        .catch(error => {
            res.render('error', { message: "Error getting ticker for " + productCode, error: error });
        })

});

/**
 * Get the order book for a specific product
 */
router.get('/product-order-book/:product', function (req, res, next) {
    var productCode = req.params.product;

    publicClient.getProductOrderBook(productCode, { level: 2 })
        .then(data => {
            // console.log(data);
            //res.json(data);
            res.render('order-book', { layout: 'layout-with-graph', bids: data.bids, asks: data.asks, title:'Order book : ' + productCode});
        })
        .catch(error => {
            res.render('error', { message: "Error getting order book for " + productCode, error: error });
        });

});

/**
 * Currencies available on the exchange
 */
router.get('/currencies', function (req, res, next) {

    publicClient.getCurrencies()
        .then(data => {
            // console.log(data);
            res.render('currencies', { data: data, title: 'Currencies' });
        })
        .catch(error => {
            res.render('error', { message: "Error getting currencies ", error: error });
        });

});

/**
 * Information about your account
 * Authenticated call
 */
router.get('/accounts', function (req, res, next) {

    authedClient.getAccounts()
        .then(data => {
            // console.log(data);
            res.render('accounts', { data: data, title: 'Accounts' });
        })
        .catch(error => {
            res.render('error', { message: "Error accounts ", error: error });
        });

});

/**
 * Hstoric rates for the specified products
 */
router.get('/history/:product', function (req, res, next) {
    var productCode = req.params.product;

    publicClient.getProductHistoricRates(productCode, 900)
        .then(data => {
            console.log(data);
            //res.json( data );
            res.render('history', { data: data, title: 'History : ' + productCode });
        })
        .catch(error => {
            res.render('error', { message: "History for " + productCode, error: error });
        })
})

module.exports = router;