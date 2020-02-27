![namebase.io DCA Bot Banner Image](/banner.png)

This bot was heavily inspired by the [GDAX DCA Bot](https://github.com/WhiteRiceWill/gdax-dca-bot) [@WhiteRiceWill](https://twitter.com/whitericewill)

# Features
This bot provides a hands-off approach to cryptocurrency investing. It lets you set recurring buys for Handshake at intervals ranging from every minute to once a day. The shorter the interval, the closer you can get to achieving a true dollar cost average.

The bot currently supports USD and trades on the exchange, [namebase.io](https://www.namebase.io/). It places market or limit market orders.

There is no sandbox mode. So be careful if you are just playing around with it.

# Dollar Cost Averaging
[Dollar cost averaging](http://www.investopedia.com/terms/d/dollarcostaveraging.asp) is the strategy of buying a fixed dollar amount of an investment at a specific interval. It is thought to reduce risk, especially in volatile markets. Since cryptocurrency markets tend to be rather volatile it has become a pretty popular practice in the space.

Dollar cost averaging is a slightly controversial topic, as there is an ongoing debate of whether or not it actually beats lump sum investing. There is strong math on both sides, however, I think its effectiveness ultimately boils down to the particular use case. I encourage you to read up on this if you're interested.

# Getting started
#### Set up namebase.io account
Sign up for an account on namebase if you haven’t already, then deposit funds (BTC).

#### Create API Key
Navigate to the API section of your dashboard and create an API key. This will generate a key and a secret. You will need these later so write them down or store them safely.

#### Set up locally
Make sure you have [Node.js](https://nodejs.org) 8.0+ installed then run
```
git clone https://github.com/01000x/namebase-dca-bot
cd namebase-dca-bot
npm install
```

#### Configure bot
Create a .env file in your project’s root directory, then copy paste the code below into it.
```
#API Authentication
  API_KEY=
  API_SECRET=

#Investment Settings
  INTERVAL_INVESTMENT_AMOUNT_USD=
  INVESTMENT_INTERVAL_HNS=
  INVESTMENT_ORDER_TYPE=

#Other
  TESTING_MODE=
```
Fill out each section as specified. If you’re having trouble, you can take a look at the env.example file that shows what a filled out version looks like.

#### API Authentication
This is where to use the key, secret, and passphrase you generated earlier.
```
#API Authentication
  API_KEY=[your API key]
  API_SECRET=[your API secret]
  API_PASSPHRASE=[your API passphrase]
```

#### Currency Specific Settings
The interval investment amount is the amount in US Dollars that you want the bot to invest at each interval. The investment interval is how often you want the bot to buy.
```
#Investment Settings
  INTERVAL_INVESTMENT_AMOUNT_USD=[amount in fiat]
  INVESTMENT_INTERVAL_HNS=[‘min’, ‘tenmins’, ‘hour’, ‘sixhours’, ‘day’]
  INVESTMENT_ORDER_TYPE=[‘market’, ‘limit’]
```
For example, if you want to invest $0.5 into handshake every 10 minutes as a market order you would use the following configuration.
```
#Investment Settings
  INTERVAL_INVESTMENT_AMOUNT_USD=0.5
  INVESTMENT_INTERVAL_HNS=tenmins
  INVESTMENT_ORDER_TYPE=market
```

#### Other
Set whether or not the bot is in testing mode.
```
#Other
  TESTING_MODE=[‘true’, ‘false’]
```

#### Test
To test that the bot is set up correctly turn it on (Caution: If not set in testing mode, the bot will actually start buying). In the project’s root directory run
```
node namebase-bot.js
```
Then check your namebase dashboard to make sure everything is working as expected. The bot uses your computer’s internal clock, so for example, if you have it set to makes buys hourly, it will buy at 1:00,2:00,3:00 etc… You should also note that the bot has a randomized, artificial delay of up to one minute on each buy. This is so that if this bot becomes popular, the exchange won’t be flooded with a large batch of market orders all at the same time.

The bot also offers a testing mode for those who want to try it out first and see what would happen. To use this feature set TESTING_MODE in the .env file to true. This can also be helpful for debugging if you're having trouble getting it to work. While in testing mode the bot will print error messages to the console if something is wrong and a confirmation message every time a order is successfully placed. The avoid long waiting times, it is recommended to set the INVESTMENT_INTERVAL_HNS to one minute (min) for testing.

#### Deploy
If you’re planning on running the bot for a long period of time it makes sense to deploy to a server. To minimize latency I recommend using Amazon’s US East N. Virginia data center. Plus an [EC2](https://aws.amazon.com/ec2/) t2.micro instance is free for the first year. Also, it's a good idea to install [PM2](https://github.com/Unitech/pm2), a production process manager for Node.js that will keep the bot up and running safely. Lastly, take precautions to not expose your .env file. Never commit it to a public repository for example.

# Strategies
The most common approach to dollar cost averaging cryptocurrencies is to do it over a long period of time (often years) and then hold your investment and wait. That isn’t the only option though. Because buys on namebase.io incur a percentage based fee, and because this bot provides the option to set very short intervals, there is an opportunity for testing out new investment strategies. For example, if you wanted to, you could dollar cost average into a position over a 3 hour period. I have no idea whether or not that is a good idea, however, I do think there are some interesting experiments that could be done.

# Contributing
This bot is an experiment and contributions are welcome. If you have a suggestion or find a bug, please create an [issue](https://github.com/01000x/namebase-dca-bot/issues).

# Disclaimer
Dollar cost averaging is not a sure-fire strategy, and this bot is experimental. Invest and use this software at your own risk.

# License
[MIT License](http://opensource.org/licenses/MIT)
