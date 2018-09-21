export interface IOptions {
    units?: string[];
    factor?: number | number[];
    ceil?: number | number[];
}
declare function humanUnit(value: number, unit?: string, { units, factor, ceil }?: IOptions): {
    value: number;
    unit: string;
};
export default humanUnit;
