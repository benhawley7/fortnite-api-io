# fortnite-api-io 

[![npm version](https://flat.badgen.net/npm/v/fortnite-api-io)](https://www.npmjs.com/package/fortnite-api-io)
![Build Status](https://img.shields.io/github/workflow/status/benhawley7/fortnite-api-io/Test/master)

Simple Wrapper Module for making API calls to https://fortniteapi.io.

Go to the [API Docs](https://fortniteapi.io/) to register for an account and to get an API key.

You can also read the [module docs](https://github.com/benhawley7/fortnite-api-io/wiki) for a list of supported calls.

## Install the Module
```bash
npm install fortnite-api-io
```

## Require and Instantiate
```js
const FortniteAPI = require("fortnite-api-io");

// Instantiate with API Credentials
const fortniteAPI = new FortniteAPI("credentials-go-here")
```

## Example API Calls
```js
// Get the next upcoming items
const upcomingItems = await fortniteAPI.listUpcomingItems();

// Get this seasons challenges
const challenges = await fortniteAPI.listChallenges("current")
```

## Acknowledgement
Thanks to the devs of https://fortniteapi.io, do consider subscribing on their API Dashboard to support the project and its costs.

## License 
MIT