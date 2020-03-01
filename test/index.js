/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * test/index.js
 * Test Libraries
 */
process.env.testMode = true;
require("./endpoints");
require("./fortnite-api");
require("./util");
process.env.testMode = false;
