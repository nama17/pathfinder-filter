// ==UserScript==
// @name         Pathfinder Filter
// @namespace    https://github.com/nama17/pathfinder-filter
// @version      0.3
// @description  Filter pathfinder killstream
// @author       nama17
// @match        https://pathfinder.sdasi.info/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://pathfinder.sdasi.info/
// @updateURL    https://github.com/nama17/pathfinder-filter/raw/main/filter.user.js
// @downloadURL  https://github.com/nama17/pathfinder-filter/raw/main/filter.user.js
// ==/UserScript==

const i = setInterval(() => {
    if (require.s.contexts._.defined["module/system_killboard"]) {
        clearInterval(i);
        changeFilter();
    }
}, 50);

const system_ignores = [
    30000142,// Jita
    30002187,// Amarr
    30002510,// Rens
    30002053,// Hek
    30002659,// Dodixie
];

function changeFilter() {
    const MapUtil = require.s.contexts._.defined["app/map/util"];
    require.s.contexts._.defined["module/system_killboard"].prototype.filterKillmailByStreams = function filterKillmailByStream(killmailData) {
        let streams = this._filterStreams || [];
        return !!(streams.includes('all') ||
                  (streams.includes('system') && this._systemData.systemId === killmailData.solar_system_id) ||
                  (streams.includes('map') && MapUtil.getSystemData(this._mapId, killmailData.solar_system_id, 'systemId') && !system_ignores.includes(killmailData.solar_system_id)));

    };
}
