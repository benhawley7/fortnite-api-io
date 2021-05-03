/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

 "use strict";

/**
 * fortnite-api-v2.js
 * Class to make requests to API version 2 endpoints
 */

const BaseClient = require('./base-client');
const endpoints = require("./endpoints-v2");

/**
 * API Wrapper containing the V2 endpoints
 */
class FortniteAPIv2 extends BaseClient {

    /**
     * listItems()
     * List all cosmetic items: skins, backpacks, emotes, pickaxes, sprays, etc.
     *
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise<object>}
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
     * @param {string} [season=current]
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise<object>}
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
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise<object>}
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
     * @param {string} itemId
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise<object>}
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
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
     * @returns {Promise<object>}
     */
    getDailyShop(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getDailyShop(lang);
        return this.request(uri);
    }

    /**
     * getBattlepassRewards()
     * Get the list of rewards given in the Battle Pass for each season
     *
     * @param {string} [season=current]
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise<object>}
     */
    getBattlepassRewards(season = "current", options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.getBattlePassRewards(season, lang);
        return this.request(uri);
    }

    /**
     * listCurrentPOI()
     * Get the current games points of interest
     *
     * @param {object} [options]
     * @param {string} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
     * @returns {Promise<object>}
     */
    listCurrentPOI(options = {}) {
        const lang = options.lang || this.defaultLang;
        const uri = endpoints.listCurrentPOI(lang);
        return this.request(uri);
    }
}

module.exports = FortniteAPIv2;
