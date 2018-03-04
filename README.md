# crypto-trader
Experimental application for trading on Crypto-currency exchanges (initially GDAX)

Initially to exercise the GDAX API's and learn more about dealing on crypto currency exchanges.

## Goal

The end goal is to develop a number of components based on the following high level 
design

1. Feeder

   Receive live data feeds from an exchange and convert to canonical form.  
   Feed these to the trading engine as a Node stream
   
2. Trading engine

   Monitor the feed of live events and take trading decisions.  Generate
   a stream of possible trades to make
   
2. Transaction engine

   Monitor funds/wallets available for trades and receive trade events from the
   Trading engine.  Interface to the exchanges and place trades
   
3. Web Application

   High level visualisation of the funds available, trades and states of the markets


## Setup

The following environment variables need to be defined:

*API Authentication*

* GDAX_PASSPHRASE
* GDAX_SECRET
* GDAX_KEY

*Environment endpoints*

* GDAX_WS_URL
* GDAX_API_URL

The endpoints will either be the *Sandbox* ot the *Live* environment

### Live 

GDAX_API_URL = https://api.gdax.com
GDAX_WS_URL = wss://ws-feed.gdax.com

### Sandbox 

GDAX_API_URL = https://api-public.sandbox.gdax.com
GDAX_WS_URL = wss://ws-feed-public.sandbox.gdax.com