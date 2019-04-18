export interface IOptions {
  unit?: string | undefined,
  units?: string[],
  factors?: number | number[],
  ceils?: number | number[]
}

export const timePreset = {
  factors: [1000, 60, 60, 24],
  units: ['ms', 's', 'm', 'h', 'd']
}

export const sizePreset = {
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
}
function humanUnit (value: number, {
    unit,
    units = [],
    factors = [],
    ceils
}: IOptions = {}) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Expected a finite number, got ${typeof value}: ${value}`)
  }
  let pos = 0
  if (unit != null) {
    pos = units.indexOf(unit)
    if (pos < 0) {
      throw new TypeError(`${unit} is not in the units: ${units.join()}`)
    }
  } else {
    unit = units[0]
  }
  const len = units.length - 1
  ceils = ceils || factors
  const factorList: number[] = !Array.isArray(factors)
        ? Array(len).fill(factors)
        : factors
  const ceilList: number[] = !Array.isArray(ceils)
        ? Array(len).fill(ceils)
        : ceils
  while (pos < len && Math.abs(value) >= (Math.abs(ceilList[pos]) || 0)) {
    value = value / factorList[pos]
    unit = units[++pos]
  }
  return {
    value,
    unit
  }
}

export default humanUnit
