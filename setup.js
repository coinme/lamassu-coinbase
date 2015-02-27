'use strict';

var LamassuConfig = require('lamassu-config');
var promptly = require('promptly');

var config = new LamassuConfig();

console.log('\nSetting up the Coinbase Exchange plugin.\n');
console.log('Please enter your API credentials.\n');
promptly.prompt('Key: ', function(keyErr, key) {
  promptly.prompt('Secret: ', function(secretErr, secret) {
    promptly.password('Password: ', function(passwordErr, password) {
      updateDb(key, secret, password, function(err) {
        if (err) throw err;
        console.log('\nSuccess.');
      });
    });
  });
});

function updateDb(key, secret, password, callback) {
  var newConfig = {
    exchanges: {
      plugins: {
        settings: {
          coinbase: {
            key: key,
            secret: secret,
            password: password
          }
        },
        current: {
          ticker: 'coinbase',
          trade: 'coinbase'
        }
      }
    }
  };
  config.mergeConfig(newConfig, callback);
}
