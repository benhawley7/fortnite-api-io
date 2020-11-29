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
 * endpoints.js
 * Exports and builds fortniteapi.io API endpoints
 */

const endpoint = "https://fortniteapi.io/v1";
module.exports = {
    listChallenges: (season, lang) => `${endpoint}/challenges?season=${season}&lang=${lang}`,
    listItems: lang => `${endpoint}/items/list?lang=${lang}`,
    listUpcomingItems: lang => `${endpoint}/items/upcoming?lang=${lang}`,
    getItemDetails: (id, lang) => `${endpoint}/items/get?id=${id}&lang=${lang}`,
    getDailyShop: lang => `${endpoint}/shop?lang=${lang}`,
    getShopVotingOptions: _ => `${endpoint}/shop/voting`,
    searchAccountId: (username, platform, strict = true) => {
        let uri = `${endpoint}/lookup?username=${username}`;
        if (platform) {
            uri += `&platform=${platform}`;
        }
        if (strict === false) {
            uri += `&strict=false`;
        }
        return uri;
    },
    getGlobalPlayerStats: account => `${endpoint}/stats?account=${account}`,
    getPlayerRecentMatches: account => `${endpoint}/matches?account=${account}`,
    getNews: (mode, lang) => `${endpoint}/news?lang=${lang}&type=${mode}`,
    getBattlePassRewards: (season, lang) => `${endpoint}/battlepass?lang=${lang}&season=${season}`,
    getAchievements: lang => `${endpoint}/achievements?lang=${lang}`,
    getTournaments: lang => `${endpoint}/events/list?lang=${lang}`,
    getTournamentSessionDetails: (windowId, page) => `${endpoint}/events/window?windowId=${windowId}&page=${page}`,
    getTournamentScores: eventId => `${endpoint}/events/cumulative?eventId=${eventId}`,
    listWeapons: _ => `${endpoint}/weapons/list`,
    listPreviousMaps: _ => `${endpoint}/maps/list`,
    listPreviousSeasons: _ => `${endpoint}/seasons/list`,
    listCurrentPOI: lang => `${endpoint}/game/poi?lang=${lang}`,
    getStatus: _ => `${endpoint}/status`,
    listCurrentGameModes: lang => `${endpoint}/game/modes?lang=${lang}`,
    listUsersById: (ids = []) => `${endpoint}/lookupUsername?id=${ids.join()}`,
    getBundles: lang => `${endpoint}/bundles?lang=${lang}`,
    listLoot: lang => `${endpoint}/loot/list?lang=${lang}`,
    getLootDetails: (id, lang) => `${endpoint}/loot/get?id=${id}&lang=${lang}`,
    listSets: lang => `${endpoint}/items/sets?lang=${lang}`,
    getReplayDownloadLink: id => `${endpoint}/events/replay?session=${id}`,
    getWeaponDetails: (id, lang) => `${endpoint}/loot/get?id=${id}&lang=${lang}`,
    listWeaponSpawnChances: mode => `${endpoint}/loot/chances?mode=${mode}`,
    getGameModeExtendedData: mode => `${endpoint}/game/modes/data?playlist=${mode}`,
    listFeaturedCreativeIslands: _ => `${endpoint}/creative/featured`,
    searchIsland: code => `${endpoint}/creative/island?code=${code}`,
    listFish: lang => `${endpoint}/loot/fish?lang=${lang}`,
    getPlayerFishStats: id => `${endpoint}/stats/fish?accountId=${id}`,
    getMapsItems: _ => `${endpoint}/maps/items/list`,
    getGameRadios: lang => `${endpoint}/game/radios?lang=${lang}`,
    getRarities: _ => `${endpoint}/rarities`
};
