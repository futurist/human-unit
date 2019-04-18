const it = require('ospec')
const {default: humanUnit, timePreset, sizePreset} = require('../')

class FileSize{
    constructor(){
        this.kilobit = 500;
		this.edgecase = 1023;
		this.kilobyte = 1024;
		this.neg = -1024;
		this.byte = 1;
		this.zero = 0;
		this.invld = "abc";
		this.huge = 10e40;
        this.small = 1 / 8;
        this.tb = 1099511627776
    }
}

it('file size', ()=>{
    const size = new FileSize()
    it(humanUnit(size.kilobit, sizePreset)).deepEquals({value:500, unit: 'B'})
    it(humanUnit(size.kilobit, {unit: 'KB', ...sizePreset})).deepEquals({value:500, unit: 'KB'})
    it(humanUnit(size.edgecase, sizePreset)).deepEquals({value:1023, unit: 'B'})
    it(humanUnit(size.kilobyte, sizePreset)).deepEquals({value:1, unit: 'KB'})
    it(humanUnit(size.kilobyte, {unit: 'KB', ...sizePreset})).deepEquals({value:1, unit: 'MB'})
    it(humanUnit(size.neg, sizePreset)).deepEquals({value:-1, unit: 'KB'})
    it(humanUnit(size.byte, sizePreset)).deepEquals({value:1, unit: 'B'})
    it(humanUnit(size.zero, sizePreset)).deepEquals({value:0, unit: 'B'})
    it(humanUnit(size.tb, sizePreset)).deepEquals({value:1.024, unit: 'TB'})
    it(humanUnit(size.small, sizePreset)).deepEquals({value:0.125, unit: 'B'})
    it(humanUnit(size.huge, sizePreset)).deepEquals({value:93132257461547860, unit: 'YB'})
    try{
        it(humanUnit(size.invld, sizePreset)).deepEquals({value:0, unit: 'B'})
    }catch(e){
        it(e instanceof TypeError).deepEquals(true)
    }
})

it('time', ()=>{
    it(humanUnit(18000, {unit: 's', ...timePreset})).deepEquals({ value: 5, unit: 'h' })
    it(humanUnit(36000, {unit: 's', ...timePreset})).deepEquals({ value: 10, unit: 'h' })
    it(humanUnit(86400, {unit: 's', ...timePreset})).deepEquals({ value: 1, unit: 'd' })
    it(humanUnit(8640000, {unit: 's', ...timePreset})).deepEquals({ value: 100, unit: 'd' })
    it(humanUnit(1000, {unit: 'ms', ...timePreset})).deepEquals({ value: 1, unit: 's' })
    it(humanUnit(60000, {unit: 'ms', ...timePreset})).deepEquals({ value: 1, unit: 'm' })
})

it('BAI WAN', ()=>{
    const options = {
        factors: [100, 100, 100],
        units: ['', 'BAI', 'WAN']
    }
    it(humanUnit(18, options)).deepEquals({ value: 18, unit: '' })
    it(humanUnit(180, options)).deepEquals({ value: 1.8, unit: 'BAI' })
    it(humanUnit(180000, options)).deepEquals({ value: 18, unit: 'WAN' })
    it(humanUnit(18000000, options)).deepEquals({ value: 1800, unit: 'WAN' })
})

if(require.main == module) it.run()
