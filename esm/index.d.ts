export interface IOptions {
    unit?: string | undefined;
    units?: string[];
    factors?: number | number[];
    ceils?: number | number[];
}
export declare const timePreset: {
    factors: number[];
    units: string[];
};
export declare const sizePreset: {
    units: string[];
    factors: number[];
};
declare function humanUnit(value: number, { unit, units, factors, ceils }?: IOptions): {
    value: number;
    unit: string;
};
export default humanUnit;
