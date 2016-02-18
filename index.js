'use strict';

var _ = require('lodash');

_.merge(exports, require('./config'));


// Ticker merhods:
exports.ticker = require('./lib/ticker').ticker;


// Trader methods:
var trader = require('./lib/trader');
exports.purchase = trader.purchase;
exports.sell = trader.sell;


var wallet = require('./lib/wallet');

exports.balance = wallet.balance;
exports.sendBitcoins = wallet.sendBitcoins;
exports.newAddress = wallet.newAddress;
