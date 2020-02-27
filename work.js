const {
    namebase,
    dcaAmtUSD,
    hnsInterval,
    orderType,
    testingMode,
    exchange
} = require('./constants.js');

const schedule = require('node-schedule');
const btcValue = require('btc-value');

// Convert text based intervals to raw intervals
const rawInterval = interval =>
    interval === 'min' ? '0-59/1 * * * *'
  : interval === 'tenmins' ? '0-59/10 * * * *'
  : interval === 'hour' ? '0 0-23/1 * * *'
  : interval === 'sixhours' ? '0 0-23/6 * * *'
  : interval === 'twelvehours' ? '0 0-23/12 * * *'
  : interval === 'day' ? '0 0 1-31/1 * *'
  : console.log('Scheduling failed: Invalid investment interval (check your .env file to make sure the investment intervals are correct)')


async function checkCredentials() {
    // Check if we can get some open orders
    const res = await exchange.openOrders(namebase.HNSBTC);
    return res;
}

checkCredentials()
  .then((res) => {
      if (res.code == 'REQUEST_UNAUTHENCIATED') {
          console.log('ERROR: Please check your .env file API Authentication settings.');
          return process.exit(22);
      }
  })
  .catch(console.error);

// Schedule buys on a randomized, artificial delay lasting up to 1 minute
const coinOn = (interval) => {

  console.log('The bot has started and is waiting to place his first order. The interval is set to: "' + hnsInterval + '" (That\'s the time you have to wait for the first output to appear)');

  schedule.scheduleJob(rawInterval(interval), () => {

    // Get BTC and HNS prices
    async function getPrices() {
      // Get the last trade price
      const hns = await exchange.priceTicker(namebase.HNSBTC);

      // Get current Bitcoin price in USD
      const btcPrice = await btcValue();

      return {btcPrice,hns};
    }

    getPrices()
      .then((res) => {

          const priceHNSUSD = res.hns.price * res.btcPrice;
          const hnsAmt = (dcaAmtUSD / priceHNSUSD).toPrecision(7);

          const randomDelay = Math.floor(Math.random() * 60) + 1;

          if (testingMode == 'false') {
              setTimeout(() => {
                  if (orderType == 'market') {
                      // Place a market order for the interval investment amount
                      exchange.marketBuy(
                        namebase.HNSBTC,
                        hnsAmt
                      );
                      console.log('I placed a Market Buy Order for ' + hnsAmt + ' HNS');
                  }
                  if (orderType == 'limit') {
                      // Place a limit order for the interval investment amount
                      exchange.limitBuy(
                        namebase.HNSBTC,
                        hnsAmt,
                        res.hns.price
                      );
                      console.log('I placed a Limit Buy Order for ' + hnsAmt + ' HNS @' + res.hns.price);
                  }
              }, randomDelay * 1000);
          } else {
              if (orderType == 'market') {
                  console.log('I would have placed a Market Buy Order for ' + hnsAmt + ' HNS');
              }
              if (orderType == 'limit') {
                  console.log('I would have placed a Limit Buy Order for ' + hnsAmt + ' HNS @' + res.hns.price);
              }
          }
      })
      .catch(console.error);
  });
};

// Turn coin on
const botOn = () => {
  coinOn(hnsInterval);
};

// Export
module.exports = botOn;
