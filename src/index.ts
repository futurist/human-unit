export interface IOptions {
  units?: string[],
  factor?: number | number[],
  ceil?: number | number[]
}

function humanUnit (value: number, unit: string = 'B', {
    units = [
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
    factor = 1024,
    ceil
}: IOptions = {}) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Expected a finite number, got ${typeof value}: ${value}`)
  }
  let pos = units.indexOf(unit)
  if (pos < 0) {
    throw new TypeError(`${unit} is not in the units: ${units.join()}`)
  }
  const len = units.length - 1
  ceil = ceil || factor
  const factorList: number[] = !Array.isArray(factor)
        ? Array(len).fill(factor)
        : factor
  const ceilList: number[] = !Array.isArray(ceil)
        ? Array(len).fill(ceil)
        : ceil
  while (pos < len && Math.abs(value) >= Math.abs(ceilList[pos])) {
    value = value / factorList[pos]
    unit = units[++pos]
  }
  return {
    value,
    unit
  }
}

export default humanUnit
