'use strict';

var Wreck = require('wreck');

// copy relevant convienient constants
var config        = require('../config');
var API_ENDPOINT  = config.API_ENDPOINT;

exports.ticker = function ticker(currencies, callback) {
  if (typeof currencies === 'string') {
    currencies = [currencies];
  }

  if (currencies.length !== 1 || currencies[0] !== 'USD') {
    return callback('Only USD is currently supported');
  }

  var headers = {
    'User-Agent': 'Mozilla/4.0 (compatible; Lamassu)'
  };
  var url = API_ENDPOINT + '/products/BTC-USD/book';
  Wreck.get(url, {headers: headers, json: true}, function(err, res, payload) {
    if (err) return callback(err);

    if (payload.message) {
        return callback(new Error(payload.message));
    }

    var result = {
      USD: {
        currency: 'USD',
        rates: {
          ask: parseFloat(payload.asks[0][0]),
          bid: parseFloat(payload.bids[0][0])
        }
      }
    };
    callback(null, result);
  });
};

