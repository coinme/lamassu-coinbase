'use strict';

var common      = require('./common');
var ticker      = require('./ticker').ticker;

// copy relevant convienient constants
var config          = require('../config');
var SATOSHI_FACTOR  = config.SATOSHI_FACTOR;
var FUDGE_FACTOR    = config.FUDGE_FACTOR;

function getProperPrice(type, callback) {
    ticker('USD', function(err, response) {
        if (err) return callback(err);

        var price = response.USD.rates[type];

        if (type === 'ask') price *= FUDGE_FACTOR;
        else price /= FUDGE_FACTOR;

        callback(null, price.toFixed(2));
    });
}

exports.purchase = function purchase(satoshis, opts, callback) {
    var options = {
        type: 'buy',
        amount: satoshis
    };

    getProperPrice('ask', function(err, price) {
        if (err) return callback(err);

        options.price = price;
        trade(options, callback);
    });
};

exports.sell = function sell(satoshis, opts, callback) {
    var options = {
        type: 'sell',
        amount: satoshis
    };

    getProperPrice('bid', function(err, price) {
        if (err) return callback(err);

        options.price = price;
        trade(options, callback);
    });
};

function tooSmallError(msg) {
    var err = new Error(msg);
    err.name = 'orderTooSmall';
    return err;
}

function trade(opts, callback) {
    var data = {
        price: opts.price,
        size: (opts.amount / SATOSHI_FACTOR).toFixed(8),
        side: opts.type,
        product_id: 'BTC-USD'
    };
    common.authRequest('POST', '/orders', data, function(err, response) {
        if (err) {
            return callback(err);
        }
        var tooSmall = response.message &&
            response.message.indexOf('Order size is too small.') !== -1;
        if (tooSmall) {
            return callback(tooSmallError(response.message));
        }

        callback(null, response);
    });
}
