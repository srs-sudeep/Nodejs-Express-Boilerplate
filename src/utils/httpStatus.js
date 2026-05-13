const mod = require('http-status');

/** http-status v2+ nests constants on `.default`; v1 used the root export */
module.exports = mod.default ?? mod;
