"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function humanUnit(value, unit, _a) {
    if (unit === void 0) { unit = 'B'; }
    var _b = _a === void 0 ? {} : _a, _c = _b.units, units = _c === void 0 ? [
        'B',
        'kB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ] : _c, _d = _b.factor, factor = _d === void 0 ? 1024 : _d, ceil = _b.ceil;
    if (!Number.isFinite(value)) {
        throw new TypeError("Expected a finite number, got " + typeof value + ": " + value);
    }
    var pos = units.indexOf(unit);
    if (pos < 0) {
        throw new TypeError(unit + " is not in the units: " + units.join());
    }
    var len = units.length - 1;
    ceil = ceil || factor;
    var factorList = !Array.isArray(factor)
        ? Array(len).fill(factor)
        : factor;
    var ceilList = !Array.isArray(ceil)
        ? Array(len).fill(ceil)
        : ceil;
    while (pos < len && Math.abs(value) >= Math.abs(ceilList[pos])) {
        value = value / factorList[pos];
        unit = units[++pos];
    }
    return {
        value: value,
        unit: unit
    };
}
exports.default = humanUnit;
