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
 * Test Endpoints Library
 */

const test = require("tape");
const endpoints = require("../lib/endpoints");

test("all endpoints prefix with correct url", assert => {
    const functions = Object.keys(endpoints);
    assert.plan(functions.length);
    functions.forEach(functionName => {
        const uri = endpoints[functionName]();
        assert.true(uri.includes("https://fortniteapi.io"), `${functionName} has correct prefix url`);
    });
    assert.end();
});

test("search account by id adds username and platform", assert => {
    assert.plan(2);
    const uri = endpoints.searchAccountId("ben", "xbl");
    assert.true(uri.includes("?username=ben"));
    assert.true(uri.includes("&platform=xbl"));
    assert.end();
});

test("search account by id adds username and strict mode false", assert => {
    assert.plan(2);
    const uri = endpoints.searchAccountId("ben", false, false);
    assert.true(uri.includes("?username=ben"));
    assert.true(uri.includes("&strict=false"));
    assert.end();
});

test("endpoints with lang have &lang={lang}", assert => {
    const lang = "en";
    const uris = [
        endpoints.getAchievements(lang),
        endpoints.getBattlePassRewards("current", lang),
        endpoints.getDailyShop(lang),
        endpoints.getItemDetails("test-id", lang),
        endpoints.getNews("br", lang),
        endpoints.getDailyShop(lang),
        endpoints.listChallenges("current", lang),
        endpoints.listItems(lang),
        endpoints.listUpcomingItems(lang)
    ];
    assert.plan(uris.length);
    uris.forEach(uri => {
        assert.true(uri.includes(`lang=${lang}`), `${uri} has lang`);
    });
    assert.end();
});
