var express = require('express');
var router = express.Router();


const key = process.env.GDAX_KEY;
const secret = process.env.GDAX_SECRET;
const passPhrase = process.env.GDAX_PASSPHRASE;

//const apiURI = 'https://api.gdax.com';
const sandboxURI = 'https://api-public.sandbox.gdax.com';


console.log('GDAX Key:', key )
console.log('GDAX_SECRET:', secret)
console.log('GDAX PassPhrase:', passPhrase)

const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const authedClient = new Gdax.AuthenticatedClient(
    key,
    secret,
    passPhrase,
    sandboxURI
);


router.get('/', function(req, res, next) {
    res.redirect('/');
});

/* GET users listing. */
router.get('/products', function(req, res, next) {

    publicClient.getProducts((error, response, data) => {
        if (error) {
            // handle the error
        } else {
            console.log( data );
            res.render('products', { data: data, title: 'Products' });
        }
    });
});


router.get('/product-ticker/:product' , function(req, res, next) {
    var productCode = req.params.product;

    publicClient.getProductTicker(productCode, (error, response, data) => {
        if (error) {
            // handle the error
        } else {
            console.log( data );
            res.render('product-ticker', { data: data, title: 'Ticker : ' + productCode  });
        }
    });

});


router.get('/product-order-book/:product' , function(req, res, next) {
    var productCode = req.params.product;

    publicClient.getProductOrderBook(productCode, (error, response, data) => {
        if (error) {
            // handle the error
        } else {
            console.log( data );
            res.json( data );
            //res.render('product-ticker', { data: data, title: 'Ticker : ' + productCode  });
        }
    });

});

// publicClient.getProductTicker('LTC-USD', (error, response, data) => {
//     if (error) {
//         // handle the error
//     } else {
//         console.log( data );
//     }
// });

router.get('/currencies' , function(req, res, next) {

    publicClient.getCurrencies((error, response, data) => {
        if (error) {
            // handle the error
        } else {
            console.log( data );
            res.render('currencies', { data: data, title: 'Currencies' });
        }
    });

});


router.get('/accounts' , function(req, res, next) {

    authedClient.getAccounts((error, response, data) => {
        if (error) {
            // handle the error
        } else {
            res.render('accounts', { data: data, title: 'Accounts' });
            console.log( data );
        }
    });

});

router.get('/history/:product' , function(req,res, next) {
    var productCode = req.params.product;

    publicClient.getProductHistoricRates( productCode , 900, (error, response, data)=> {
        if (error) {
            // handle the error
        } else {
            console.log( data );
            //res.json( data );
            res.render('history', { data: data, title: 'History : ' + productCode });
        }
    } )
})


module.exports = router;