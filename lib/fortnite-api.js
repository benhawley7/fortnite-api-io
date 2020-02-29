/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * fortnite-api.js
 * Class to make requests to API
 */

// External Modules
const fetch = require("node-fetch");


// Internal Libaries
const endpoints = require("./endpoints");
const {supportsLanguage} = require("./util");

/**
 * Fortnite API Class
 */
class ForniteAPI {

    /**
     * constructor()
     *
     * @param {*} credentials
     * @param {*} [config]
     * @param {String} [config.defaultLanguage]
     */
    constructor(credentials, config = {}) {
        if (!credentials) {
            throw new Error("Invalid Credentials Supplied.");
        }

        const defaultLanguage = config.defaultLanguage || "en";
        if (!supportsLanguage(defaultLanguage)) {
            throw new Error(`Supplied default language ${defaultLanguage} is not supported`);
        }

        this.credentials = credentials;
    }

    /**
     * request()
     * Use node-fetch to query API
     *
     * @param {String} uri
     * @param {Object} [options]
     * @param {String} [options.method]
     */
    async request(uri, options = {method: "GET"}) {
        const response = await fetch(uri, {
            method: options.method,
            headers: {
                Authorization: `${this.credentials}`
            }
        });

        const data = await response.json();
        return data;
    }

    /**
     * listItems()
     * List all cosmetic items: skins, backpacks, emotes, pickaxes, sprays, etc.
     *
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    async listItems(options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.listItems(lang);
        return this.request(uri);
    }

    /**
     * listChallenges()
     * List all challenges as well as rewards (xp, stars, cosmetics).
     * Weekly challenges/missions are available for each season under .weekly
     * Limited time missions are available under .limited_time
     *
     * @param {String} [season=current]
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    async listChallenges(season = "current", options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.listChallenges(season, lang);
        return this.request(uri);
    }

    /**
     * listUpcomingItems()
     * List upcoming cosmetic items: skins, backpacks, emotes, pickaxes.
     *
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    async listUpcomingItems(options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.listUpcomingItems(lang);
        return this.request(uri);
    }

    /**
     * getItemDetails()
     * Get all available details about an item.
     * The ID can be found from the full list of items.
     *
     * @param {String} itemId
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    async getItemDetails(itemId, options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.getItemDetails(itemId, lang);
        return this.request(uri);
    }

    /**
     * getDailyShop()
     * List all items currently in the shop
     *
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    async getDailyShop(options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.getDailyShop(lang);
        return this.request(uri);
    }

    /**
     * getShopVotingOptions()
     * Get options to vote for the next community shop item
     */
    async getShopVotingOptions() {
        const uri = endpoints.getShopVotingOptions();
        return this.request(uri);
    }

    /**
     * searchAccountId()
     * Search an account ID using a player name
     *
     * @param {String} username
     * @param {Object} [options]
     * @param {Boolean} [options.strict=true] When false will return other results for similar names
     * @param {Boolean} [options.platform=""] Search for accounts not linked to an epic account: xbl or psn
     */
    async searchAccountId(username, options = {strict: true, platform: false}) {
        const uri = endpoints.searchAccountId(username, options.platform, options.strict);
        return this.request(uri);
    }

    /**
     * getGlobalPlayerStats()
     * Get player stats, with a breakdown per platform used (mouse & keyboard, gamepad, touch)
     *
     * @param {String} accountId
     */
    getGlobalPlayerStats(accountId) {
        const uri = endpoints.getGlobalPlayerStats(accountId);
        return this.request(uri);
    }

    /**
     * getPlayerRecentMatches()
     * List the last 25 games for a player. Some games can be grouped.
     * If it's the first time you search this user, the matches list will be empty.
     *
     * @param {String} accountId
     */
    getPlayerRecentMatches(accountId) {
        const uri = endpoints.getPlayerRecentMatches(accountId);
        return this.request(uri);
    }

    /**
     * getNews()
     * Lists the current news in Fortnite Battle Royale or Save The World
     *
     * @param {String} [mode=br] game mode "br" or "stw"
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    getNews(mode, options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.getNews(mode, lang);
        return this.request(uri);
    }

    /**
     * getBattlepassRewards()
     * Get the list of rewards given in the Battle Pass for each season
     *
     * @param {String} [season=current]
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    getBattlepassRewards(season = "current", options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.getBattlePassRewards(season, lang);
        return this.request(uri);
    }

    /**
     * getAchievements()
     * Get the list of achievements
     *
     * @param {Object} [options]
     * @param {String} [options.lang]
     */
    getAchievements(options = {}) {
        const lang = options.lang || this.defaultLanguage;
        const uri = endpoints.getAchievements(lang);
        return this.request(uri);
    }
}

module.exports = ForniteAPI;
