# fortnite-api-io

[![npm version](https://flat.badgen.net/npm/v/fortnite-api-io)](https://www.npmjs.com/package/fortnite-api-io)
![](https://github.com/benhawley7/fortnite-api-io/workflows/Node.js%20CI/badge.svg)

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
const client = new FortniteAPI("credentials-go-here", {
    defaultLanguage: 'en', // Optional - will default to 'en'
    ignoreWarnings: false // Optional -will default to false
});
```

## Example API Calls
The API is currently transitioning into its second version. Where available, it is highly recommended to use the version 2 endpoint.

```js
// Get the next upcoming items (version 2)
const upcomingItems = await client.v2.listItems();

// Get this season's challenges (version 2)
const challenges = await client.v2.listChallenges("current");

// Get all stats for a specific loot/weapon item (version 1)
const loot = await client.getLootDetails();
```

If you call a version 1 method, when there is an available version 2 method, a warning log will be printed.
The deprecation warnings can be disabled when instantiating the API wrapper.

```js
const upcomingItems = await client.listItems();
// WARNING: listItems has been deprecated - please use FortniteAPI.v2.listItems
```

## Acknowledgement
Thanks to the devs of https://fortniteapi.io, do consider subscribing on their API Dashboard to support the project and its costs.

## License
MIT