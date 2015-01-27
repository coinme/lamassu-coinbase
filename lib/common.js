'use strict';

var Wreck       = require('wreck');
var crypto      = require('crypto');

// copy relevant convienient constants
var config          = require('../config');
var API_ENDPOINT    = config.API_ENDPOINT;

function buildSignature(method, path, payload, timestamp, secret) {
  var what = timestamp + method + path + payload;
  var key = new Buffer(secret, 'base64');
  var hmac = crypto.createHmac('sha256', key);
  return hmac.update(what).digest('base64');
}

exports.authRequest = function authRequest(method, path, data, callback) {

  // TODO: check for credentials existance
  if (!config.key || !config.secret || !config.password)
    return callback(new Error('Must provide key, secret and client ID to make this API request'));

  data = data || {};

  var secret = config.secret;
  var payload = JSON.stringify(data);
  var timestamp = Date.now() / 1000;

  var options = {
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; Lamassu)',
      'content-type': 'application/json',
      'CB-ACCESS-KEY': config.key,
      'CB-ACCESS-SIGN': buildSignature(method, path, payload, timestamp, secret),
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-PASSPHRASE': config.password
    },
    json: true,
    payload: payload
  };

  var uri = API_ENDPOINT + path;

  var wreck = Wreck[method.toLowerCase()];
  wreck(uri, options, function(err, res, payload) {
    callback(err, payload);
  });
};
