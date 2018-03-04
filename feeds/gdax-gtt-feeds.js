const debug = require('debug')('trader:gtt')

//const apiURI = 'https://api.gdax.com';
const sandboxURI = 'https://api-public.sandbox.gdax.com';

const GTT = require('gdax-trading-toolkit');
const logger = GTT.utils.ConsoleLoggerFactory();
const products = ['BTC-USD', 'ETH-USD', 'LTC-USD'];

//var exports = module.exports = {};

const tallies = {};
products.forEach((product) => {
    tallies[product] = {};
});

//exports.testGTT = function() {

debug("Loading Feeds");

GTT.Factories.GDAX.FeedFactory(logger , products).then((feed) => {
    debug("Starting Feed factory")
    feed.on('data', (msg) => {
        count++;
        if (!msg.productId) {
            tallies.other += 1;
        } else {
            const tally = tallies[msg.productId];
            if (!tally[msg.type]) {
                tally[msg.type] = 0;
            }
            tally[msg.type] += 1;
        }
        if (count % 1000 === 0) {
            printTallies();
        }
    });
}).catch((err) => {
    debug('error(a)', err.message);
    process.exit(1);
});


function printTallies() {
    console.log(`${count} messages received`);
    for (let p in tallies) {
        let types = Object.keys(tallies[p]).sort();
        let tally = types.map(t => `${t}: ${tallies[p][t]}`).join('\t');
        console.log(`${p}: ${tally}`);
    }
}
