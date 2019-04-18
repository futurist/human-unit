export var timePreset = {
    factors: [1000, 60, 60, 24],
    units: ['ms', 's', 'm', 'h', 'd']
};
export var sizePreset = {
    units: [
        'B',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
    ],
    factors: [
        1024,
        1024,
        1024,
        1000,
        1000,
        1000,
        1000,
        1000
    ]
};
function humanUnit(value, _a) {
    var _b = _a === void 0 ? {} : _a, unit = _b.unit, _c = _b.units, units = _c === void 0 ? [] : _c, _d = _b.factors, factors = _d === void 0 ? [] : _d, ceils = _b.ceils;
    if (!Number.isFinite(value)) {
        throw new TypeError("Expected a finite number, got " + typeof value + ": " + value);
    }
    var pos = 0;
    if (unit != null) {
        pos = units.indexOf(unit);
        if (pos < 0) {
            throw new TypeError(unit + " is not in the units: " + units.join());
        }
    }
    else {
        unit = units[0];
    }
    var len = units.length - 1;
    ceils = ceils || factors;
    var factorList = !Array.isArray(factors)
        ? Array(len).fill(factors)
        : factors;
    var ceilList = !Array.isArray(ceils)
        ? Array(len).fill(ceils)
        : ceils;
    while (pos < len && Math.abs(value) >= (Math.abs(ceilList[pos]) || 0)) {
        value = value / factorList[pos];
        unit = units[++pos];
    }
    return {
        value: value,
        unit: unit
    };
}
export default humanUnit;
