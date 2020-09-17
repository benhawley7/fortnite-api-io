/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @author Théo Bontemps (maintainer)
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
const { supportsLanguage } = require("./util");

/**
 * Fortnite API Class
 */
class FortniteAPI {
    /**
     * constructor()
     *
     * @param {String} credentials
     * @param {Object} [config]
     * @param {String} [config.defaultLanguage]
     */
    constructor(credentials, config = {}) {
        if (!credentials) {
            throw new Error("Invalid Credentials Supplied.");
        }

        this.defaultLang = config.defaultLanguage || "en";
        if (!supportsLanguage(this.defaultLang)) {
            throw new Error(
                `Supplied default language ${this.defaultLang} is not supported`
            );
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
     * @returns {Promise}
     */
    async request(uri, options = { method: "GET" }) {
        // In test mode, return the URI we are about to fetch
        if (process.env.testMode) {
            return uri;
        }
        const response = await fetch(uri, {
            method: options.method,
            headers: {
                Authorization: `${this.credentials}`,
            },
        });

        const data = await response.json();
        return data;
    }

    /**
     * listItems()
     * List all cosmetic items: skins, backpacks, emotes, pickaxes, sprays, etc.
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise}
     */
    listItems(options = {}) {
        const lang = options.lang || this.defaultLang;
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
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise}
     */
    listChallenges(season = "current", options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listChallenges(season, lang);
        return this.request(uri);
    }

    /**
     * listUpcomingItems()
     * List upcoming cosmetic items: skins, backpacks, emotes, pickaxes.
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise}
     */
    listUpcomingItems(options = {}) {
        const lang = options.lang || this.defaultLang;
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
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise}
     */
    getItemDetails(itemId, options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getItemDetails(itemId, lang);
        return this.request(uri);
    }

    /**
     * getDailyShop()
     * List all items currently in the shop
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise}
     */
    getDailyShop(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getDailyShop(lang);
        return this.request(uri);
    }

    /**
     * getShopVotingOptions()
     * Get options to vote for the next community shop item
     * @returns {Promise}
     */
    getShopVotingOptions() {
        const uri = endpoints.getShopVotingOptions();
        return this.request(uri);
    }

    /**
     * searchAccountId()
     * Search an account ID using a player name
     *
     * @deprecated since v1.3.0 please use getUserById
     * @param {String} username
     * @param {Object} [options]
     * @param {Boolean} [options.strict=true] When false will return other results for similar names
     * @param {String} [options.platform=""] Search for accounts not linked to an epic account: xbl or psn
     * @returns {Promise}
     */
    searchAccountId(username, options = { strict: true, platform: "" }) {
        const uri = endpoints.searchAccountId(
            username,
            options.platform,
            options.strict
        );
        return this.request(uri);
    }

    /**
     * getGlobalPlayerStats()
     * Get player stats, with a breakdown per platform used (mouse & keyboard, gamepad, touch)
     *
     * @param {String} accountId
     * @returns {Promise}
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
     * @returns {Promise}
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
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    getNews(mode = "br", options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getNews(mode, lang);
        return this.request(uri);
    }

    /**
     * getBattlepassRewards()
     * Get the list of rewards given in the Battle Pass for each season
     *
     * @param {String} [season=current]
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    getBattlepassRewards(season = "current", options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getBattlePassRewards(season, lang);
        return this.request(uri);
    }

    /**
     * getAchievements()
     * Get the list of achievements
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */   
    getAchievements(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getAchievements(lang);
        return this.request(uri);
    }

    /**
     * getTournaments
     * Get the list of tournaments
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    getTournaments(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getTournaments(lang);
        return this.request(uri);
    }

    /**
     * getTournamentSessionDetails()
     * Get a tournament session details: rules, payout, results
     *
     * @param {String} windowId
     * @param {Integer} [page=0]
     * @returns {Promise}
     */
    getTournamentSessionDetails(windowId, page = 0) {
        const uri = endpoints.getTournamentSessionDetails(windowId, page);
        return this.request(uri);
    }

    /**
     * listPreviousMaps()
     * Get the list of links to the different maps
     *
     * @returns {Promise}
     */
    listPreviousMaps() {
        const uri = endpoints.listPreviousMaps();
        return this.request(uri);
    }

    /**
     * listPreviousSeasons()
     * List all the season dates and patch versions associated.
     * 
     * @returns {Promise}
     */
    listPreviousSeasons() {
        const uri = endpoints.listPreviousSeasons();
        return this.request(uri);
    }

    /**
     * listCurrentPOI()
     * Get the current games points of interest
     * 
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    listCurrentPOI(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listCurrentPOI(lang);
        return this.request(uri);
    }

    /**
     * getStatus()
     * Get the Fortnite server status
     *
     * @returns {Promise}
     */
    getStatus() {
        const uri = endpoints.getStatus();
        return this.request(uri);
    }

    /**
     * listCurrentGameModes()
     * List the current game modes
     * 
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    listCurrentGameModes(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listCurrentGameModes(lang);
        return this.request(uri);
    }

    /**
     * getAccountIdByUsername()
     * Get an account ID using a player name
     *
     * @param {String} username
     * @param {Object} [options]
     * @param {Boolean} [options.strict=true] When false will return other results for similar names
     * @param {String} [options.platform=""] Search for accounts not linked to an epic account: xbl or psn
     * @returns {Promise}
     */
    getAccountIdByUsername(username, options = { strict: true, platform: "" }) {
        const uri = endpoints.searchAccountId(
            username,
            options.platform,
            options.strict
        );
        return this.request(uri);
    }

    /**
     * getUserById()
     * Get a user account name by their Fortnite ID
     *
     * @param {String} id
     * @returns {Promise}
     */
    getUserById(id) {
        const uri = endpoints.listUsersById([id]);
        return this.request(uri);
    }

    /**
     * listUsersById()
     * List user accounts by a list of ids
     *
     * @param {Array<String>} [ids=[]]
     * @returns {Promise}
     */
    listUsersById(ids = []) {
        const uri = endpoints.listUsersById(ids);
        return this.request(uri);
    }

    /**
     * getBundles()
     * List recent bundles
     * 
     * @premium
     * @param {Object} [options]
     * @param {String} [options.lang] en, de, es, fr, it, ja
     * @returns {Promise}
     */
    getBundles(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getBundles(lang);
        return this.request(uri);
    }

    /**
     * listLoot()
     * List all loot/weapons in the game with their basic stats
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    listLoot(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listLoot(lang);
        return this.request(uri);
    }

    /**
     * getLootDetails()
     * Get all stats for a specific loot/weapon item
     * 
     * @premium
     * @param {String} id of loot item
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    getLootDetails(id, options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getLootDetails(id, lang);
        return this.request(uri);
    }

    /**
     * listSets()
     * List all the sets used by cosmetics.
     *
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    listSets(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listSets(lang);
        return this.request(uri);
    }

    /**
     * getReplayDownloadLink()
     * Get creative map informations
     *
     * @premium
     * @param {String} id of session
     * @returns {Promise}
     */
    getReplayDownloadLink(id) {
        const uri = endpoints.getReplayDownloadLink(id);
        return this.request(uri);
    }

    /**
     * getWeaponDetails()
     * Get all stats for a specific loot/weapon item
     * 
     * @premium
     * @param {String} id of weapon
     * @param {Object} [options]
     * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise}
     */
    getWeaponDetails(id, options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getWeaponDetails(id, lang);
        return this.request(uri);
    }

    /**
     * listWeaponsSpawnChance()
     * List the spawn chances for each type for a given game mode.
     *
     * @premium
     * @param {String} mode
     * @returns {Promise}
     */
    listWeaponsSpawnChance(mode) {
        const uri = endpoints.listWeaponsSpawnChance(mode);
        return this.request(uri);
    }

    /**
     * getGameModeExtendedData()
     * A lot of different values, ranging from spawn % for rare chests, to number of llamas per game.
     *
     * @premium
     * @param {String} mode
     * @returns {Promise}
     */
    getGameModeExtendedData(mode) {
        const uri = endpoints.getGameModeExtendedData(mode);
        return this.request(uri);
    }

    /**
     * listFeaturedCreativeIslands()
     * List the current featured islands in creative mode
     *
     * @returns {Promise}
     */
    listFeaturedCreativeIslands() {
        const uri = endpoints.listFeaturedCreativeIslands();
        return this.request(uri);
    }

    /**
     * searchIsland()
     * Get all details related to a creative island
     *
     * @param {String} code of map
     * @returns {Promise}
     */
    searchIsland(code) {
        const uri = endpoints.searchIsland(code);
        return this.request(uri);
    }

    /**
     * listFish()
     * Get the list of fish (name, description, image) as well as their minimum and maximum length
     *
     * @param {Object} [options]
     * @param {String} [options.lang] unknown supported languages
     * @returns {Promise}
     */
    listFish(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listFish(lang);
        return this.request(uri);
    }

    /**
     * getPlayerFishStats()
     * Get the stats for a specific player: each fish caught is returned with the best length for that player
     *
     * @param {String} accountId
     * @returns {Promise}
     */
    getPlayerFishStats(accountId) {
        const uri = endpoints.getPlayerFishStats(accountId);
        return this.request(uri);
    }
}

module.exports = FortniteAPI;
