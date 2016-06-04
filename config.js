'use strict';

var _ = require('lodash');

exports.NAME = 'Coinbase';
exports.SUPPORTED_MODULES = ['ticker', 'trader', 'wallet'];
exports.API_ENDPOINT = 'https://api.exchange.coinbase.com';

exports.SATOSHI_FACTOR = 1e8;
exports.FUDGE_FACTOR = 1.05;

exports.config = function config(localConfig) {
  if (localConfig) {
      _.merge(exports, localConfig);
  }
};
