# human-unit
Unit formatter for human

[![Build Status](https://travis-ci.org/futurist/human-unit.svg?branch=master)](https://travis-ci.org/futurist/human-unit)
[![NPM Version](https://img.shields.io/npm/v/human-unit.svg)](https://www.npmjs.com/package/human-unit)

## Install
```sh
npm install human-unit
```

## Usage

### - File size

```js
import humanUnit from 'human-unit'
humanUnit(1024)  // {value: 1, unit: 'KB'}
humanUnit(1024, 'MB')  // {value: 1, unit: 'GB'}
// change units as you need
humanUnit(1024, 'M', {units: ['M', 'G']})  // {value: 1, unit: 'G'}
```

### - Time unit
```js
import humanUnit from 'human-unit'
const timePreset = {
    factor: [1000, 60, 60, 24],
    units: ['mili', 'sec', 'min', 'hour', 'day']
}
humanUnit(18000, 'sec', timePreset)  // {value: 5, unit: 'hour'}
humanUnit(60000, 'mili', timePreset)  // {value: 1, unit: 'min'}
```

## API

### `humanUnit(value: number, unit?: string, options?:IOptions)`
*return `{ value: number; unit: string; }`*

```ts
interface IOptions {
    units?: string[];  // array of units, must contain unit arg
    factor?: number | number[]; // factor for All/Each units
    ceil?: number | number[];  // ceil for All/Each units
}
```

The `factor` is the divider when bumpping units levels, can be a fixed `number` like in file size of `1024`, or can be array of `numbers` like in time units.

The `ceil` value will be used to determine whether the unit should be bumped into next level, say, `ceil: 10240`, will allow the result: `{value: 10000, unit: 'MB'}`, better for human control.

## Note

The file size calculation is easy if you look into [the rule](https://en.wikipedia.org/wiki/Kilobyte), I want to use **SI** standard when below `GB`, so the units is `B,KB,MB,GB` (notice the `KB` is not `kB`), but when the size is very big, after `GB` I want to use `IEC` standard, this is why the `factor` is array of numbers by default that changed from `1024` to `1000` after `GB`.

