
var Client = require('coinbase').Client;

var config          = require('../config');
var SATOSHI_FACTOR  = config.SATOSHI_FACTOR;


// no-op
exports.balance = function(callback) {
  if (!config.key || !config.secret)
    return callback(new Error('Must provide key, secret and client ID to make this API request'));

  var client = new Client({'apiKey': config.key, 'apiSecret': config.secret});

  client.getAccount(config.accountId, function(err, account) {
    if(err) {
      callback(new Error(err.message));
    } else {
      callback(null, { BTC: account.balance.amount*SATOSHI_FACTOR});
    }
  });

};

exports.sendBitcoins = function sendBitcoins(address, satoshis, fee, callback) {
  var client = new Client({'apiKey': config.key, 'apiSecret': config.secret});

  client.getAccount(config.accountId, function(err, account) {
	account.sendMoney({'to': address,
					  'amount': satoshis/config.SATOSHI_FACTOR,
					  'currency': 'BTC'}, function(err, tx_hash) {
						callback(null, tx_hash);
					  });
});

};

exports.newAddress = function(cb) {
  cb(new Error('Not implemented'));
};

