const Gdax = require('gdax');

let websocket;


var exports = module.exports = {};

/**
 * Connect to the GDAX websocket - this doesn't currently reconnect on error/close
 * @param channelArray - array of deals to monitor e.g. ['BTC-USD', 'ETH-USD']
 */
exports.startFullStream = function(channelArray) {

    websocket = new Gdax.WebsocketClient(channelArray);

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

exports.startLevek2Stream = function(channelArray) {

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

