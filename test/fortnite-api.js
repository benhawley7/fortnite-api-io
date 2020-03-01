/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * test/fortnite-api.js
 * Test Fornite API Class
 */

const test = require("tape");
const ForniteAPI = require("../lib/fortnite-api");

test("api class throws without credentials", assert => {
    assert.plan(1);
    try {
        const fortniteAPI = new ForniteAPI();
        assert.fail("error should have thrown");
    } catch (e) {
        assert.equals(e.message, "Invalid Credentials Supplied.", "Invalid Creds msg thrown");
    }
    assert.end();
});

test("api class throws with invalid lang", assert => {
    assert.plan(1);
    try {
        const fortniteAPI = new ForniteAPI("example-api-key", {defaultLanguage: "cy"});
        assert.fail("error should have thrown");
    } catch (e) {
        assert.equals(e.message, "Supplied default language cy is not supported", "Invalid Lang msg thrown");
    }
    assert.end();
});

test("api class does not throw with credentials and valid default lang", assert => {
    assert.plan(1);
    try {
        const fortniteAPI = new ForniteAPI("example-api-key", {defaultLanguage: "en"});
        assert.true("error did not throw");
    } catch (e) {
        assert.fail("error should not have thrown");
    }
    assert.end();
});

test("all methods return a uri and uri has correct prefix", async assert => {
    const fortniteAPI = new ForniteAPI("example-api-key");
    const ignore = ["constructor", "request"];
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(fortniteAPI))
        .filter(method => !ignore.includes(method));
    assert.plan(methods.length);
    for (const methodName of methods) {
        const uri = await fortniteAPI[methodName]();
        assert.true(uri.includes("https://fortniteapi.io"), `method: ${methodName} has correct prefix url`);
    }
    assert.end();
});

test("credentials are set correctly", assert => {
    assert.plan(1);
    const credentials = "example-api-key";
    const fortniteAPI = new ForniteAPI(credentials);
    assert.equals(fortniteAPI.credentials, credentials, "credentials are set");
    assert.end();
});

test("getBattlepassRewards defaults to current season", async assert => {
    assert.plan(1);
    const fortniteAPI = new ForniteAPI("example-api-key");
    const uri = await fortniteAPI.getBattlepassRewards();
    assert.true(uri.includes("season=current"));
    assert.end();
});

test("listChallenges defaults to current season", async assert => {
    assert.plan(1);
    const fortniteAPI = new ForniteAPI("example-api-key");
    const uri = await fortniteAPI.listChallenges();
    assert.true(uri.includes("season=current"));
    assert.end();
});

test("getNews defaults to br news", async assert => {
    assert.plan(1);
    const fortniteAPI = new ForniteAPI("example-api-key");
    const uri = await fortniteAPI.getNews();
    assert.true(uri.includes("type=br"));
    assert.end();
});
