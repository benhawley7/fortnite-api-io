/**
 * fortnite-api-io
 * Module to make API calls to fortniteapi.io
 *
 * @author Ben Hawley
 * @license MIT
 */

"use strict";

/**
 * endpoints-v2.js
 * Exports and builds fortniteapi.io V2 API endpoints
 */

const endpoint = "https://fortniteapi.io/v2";

module.exports = {
    listChallenges: (season, lang) => `${endpoint}/challenges?season=${season}&lang=${lang}`,
    listItems: lang => `${endpoint}/items/list?lang=${lang}`,
    listUpcomingItems: lang => `${endpoint}/items/upcoming?lang=${lang}`,
    getItemDetails: (id, lang) => `${endpoint}/items/get?id=${id}&lang=${lang}`,
    getDailyShop: lang => `${endpoint}/shop?lang=${lang}`,
    getBattlePassRewards: (season, lang) => `${endpoint}/battlepass?lang=${lang}&season=${season}`,
    listItemLocations: () => `${endpoint}/maps/items/list`,
    listCurrentPOI: lang => `${endpoint}/game/poi?lang=${lang}`
};
