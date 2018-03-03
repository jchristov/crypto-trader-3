const Gdax = require('gdax');
const debug = require('debug')('trader:feeds')



const key = process.env.GDAX_KEY;
const secret = process.env.GDAX_SECRET;
const passPhrase = process.env.GDAX_PASSPHRASE;
const apiUrl = process.env.GDAX_API_URL;
const wsUrl = process.env.GDAX_WS_URL;

var exports = module.exports = {};

/**
 * Web socket feed locations
 * Live : wss://ws-feed.gdax.com
 * Sandbox : wss://ws-feed-public.sandbox.gdax.com
 */

/**
 * Connect to the GDAX websocket - this doesn't currently reconnect on error/close
 * @param channelArray - array of deals to monitor e.g. ['BTC-USD', 'ETH-USD']
 */
exports.startGdaxFeed = function(channelArray) {

    let webSocket = new Gdax.WebsocketClient(
        channelArray,
        wsUrl,
        {
            key: key,
            secret: secret,
            passphrase: passPhrase,
        },
        { channels: ['ticker'] })
    ;

    webSocket.on('message', msg => {
        switch (msg.type) {
            case 'heartbeat':
                break;
            case 'subscriptions':
                debug("subscriptions : %s" , msg);
            case 'ticker':
                debug("Ticker: %s : (%s)%s : %s -> %s",
                    msg.product_id,
                    msg.side, msg.price,
                    msg.low_24h, msg.high_24h)
                break;
            default:
                debug("%s : %s", msg.type, msg.product_id);
        }
    });
    webSocket.on('error', err => {
        debug("Error : %s", err);
    });
    webSocket.on('close', () => {
        debug("Connection closed")
    });

    return webSocket;
}

exports.startLevel2Stream = function(channelArray) {

    websocket = new Gdax.WebsocketClient('level2');

    websocket.on('message', data => {
        console.log(data);
    });
    websocket.on('error', err => {
        console.log(err);
    });
    websocket.on('close', () => {
        console.log("Connection closed")
    });
}

