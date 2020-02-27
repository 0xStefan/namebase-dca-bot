require('dotenv').config();
const namebase = require('namebase-exchange-api');

// Assign the environmental variables to constants
const key = process.env.API_KEY;
const b64secret = process.env.API_SECRET;

const dcaAmtUSD = process.env.INTERVAL_INVESTMENT_AMOUNT_USD;
const hnsInterval = process.env.INVESTMENT_INTERVAL_HNS;
const orderType = process.env.INVESTMENT_ORDER_TYPE;

const testingMode = process.env.TESTING_MODE;

// Setupo the exchange
const exchange = new namebase.Exchange(
  key,
  b64secret
);

// Exports
module.exports = {
  namebase,
  dcaAmtUSD,
  hnsInterval,
  orderType,
  testingMode,
  exchange
};
