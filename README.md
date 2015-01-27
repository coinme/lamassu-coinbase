lamassu-coinbase
================

[![Build Status](https://travis-ci.org/lamassu/lamassu-coinbase.svg)](https://travis-ci.org/lamassu/lamassu-coinbase)

Lamassu Coinbase ticker and trader


### Testing

1. Open [`mockConfig.template.json`](https://github.com/lamassu/lamassu-coinbase/blob/master/test/mockConfig.template.json) file, and input your Coinbase [credentials](https://exchange.coinbase.com/settings) there,
2. Make sure to authorize:
  - [x] Trade.
2. Rename `mockConfig.template.json` to `mockConfig.json`,
3. Type this into your terminal:

```bash
npm update # in case you cloned via git
npm test
```

> NOTE: Two last tests depend on your account having 0.01 BTC of available balance (both in USD and BTC).
