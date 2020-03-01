/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * test/util.js
 * Test Utilities library
 */
const test = require("tape");
const util = require("../lib/util");

test("test supportsLanguage with supported language", assert => {
    assert.plan(1);
    const lang = "en";
    assert.true(util.supportsLanguage(lang), "en is supported");
    assert.end();
});

test("test supportsLanguage with unsupported language", assert => {
    assert.plan(1);
    const lang = "cy";
    assert.false(util.supportsLanguage(lang), "cy (welsh) is not supported");
    assert.end();
});
