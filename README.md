---
title: Integrating EPNS Channel opt-in/opt-out in Front end Dapps
description: Integrate EPNS into your dApp
parent: N/A
tags:
  - EPNS
  - FrontEnd SDK
  - Notification
  - Channels
slug: EPNS-in-front-ends
contentType: guides
root: false
---
# Integrating EPNS in Frontend
**Level**: Beginner  
**Estimated Time**: 5 minuntes

## Learning Objectives

- Learn how to integrate the EPNS decentralized notification service into your React Frontend Dapp.
- Opt-in to your channel directly from your dApp

## Pre-requisites

- Basic knowledge of React.

## Sections
- [Setting up the environment](#setup)
- [Fetching the channel details as stored on EPNS](#fetching-the-channels)
- [Opt-in to your channel directly from your dApp](#optin-to-channel)
- [Opt-out from your channel directly from your dApp](#optout-from-channel)

## Setup the react application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `yarn install` 

#### For a react project run: `npm install @epnsproject/frontend-sdk-staging` 

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.



## Fetching-The-Channel details

The first step is to import the just installed package.
```javascript
import { channels } from "@epnsproject/frontend-sdk-staging";
```

Then the next step is to define the required variables to make a request to fetch a channel's detail.!
```javascript
// define the variables required to make a request
const CHANNEL_ADDRESS = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7";
const [channel, setChannel] = useState(null);
// define the variables required to make a request
```
And finally we make a request to fetch a channel's details!
```javascript
//fetch the channel's details
    channels.getChannelByAddress(CHANNEL_ADDRESS, BASE_URL).then((data) => {
      setChannel(data);
    });
//fetch the channel's details
```
**output**:
```
{
    "id": 1,
    "channel": "0x2AEcb6DeE3652dA1dD6b54D5fd4f7D8F43DaEb78",
    "ipfshash": "bafkreifk42oxcvn25duyfwlkewf3nco7alwa6dp2f7wninnf7l7oi66zti",
    "name": "Rayan's channel",
    "info": "Get latest updates",
    "url": "epns.io",
    "icon": "https://gateway.ipfs.io/ipfs/QmUjdbV9KGpGnhCzC7nM2cvd2yepx6QEicGCnzm9WxNxD8",
    "processed": 1,
    "attempts": 0,
    "alias_address": "NULL",
    "activation_status": 1,
    "verified_status": 1,
    "timestamp": "2022-02-03T22:50:05.000Z"
}
```

## Opt-in to a channel from the dApp

Now we want to opt into a channel by using it's address as an identifier
```javascript
// define the variables which would be needed 
  const { library, active, account, chainId } = useWeb3React();
  const signer = library.getSigner(account); //this could also be any entity which has a method `_signTypedData(domain, type, message)` which is capable of signing messages using eip 712.
  const channelAddress = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7"; //the address of the channel we want to op-in to or opt-out from
  const chainId = 1; //this is for the ethereum network, and can be any of out supported chains.
  const userAddress = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";
// define the variables which would be needed 

// opt into the channel
    function optIntoChannel() =>{
		channels.optOut(
            signer,
            channelAddress,
            chainId,
            userAddress,
        ).then(() => {
			// doSomethingSuccessfull();
		}).catch(() => {
			// showErrorMessage();
		})
	}
// opt into the channel


// opt out from the channel
    function optOutfromChannel() =>{
		channels.optIn(
            signer,
            channelAddress,
            chainId,
            userAddress,
        ).then(() => {
			// doSomethingSuccessfull();
		}).catch(() => {
			// showErrorMessage();
		})
	}
// opt out from the channel


// get if a user is subscribed to a channel based on the address
const [isSubscribed, setIsSubscribed] = useState(false);
channels.isUserSubscribed(userAddress, channelAddress).then((res) => {
      setIsSubscribed(res);
});
// we can use this method to automatically know if to subscribe or unsubscribe a user's account based on if it is alreadt subscribed.
// get if a user is subscribed to a channel based on the address
```

A working example can be found at `src/App.js`

Happy Building!!!