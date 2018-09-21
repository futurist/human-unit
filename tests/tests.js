const it = require('ospec')
const humanUnit = require('../').default

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
    it(humanUnit(size.kilobit)).deepEquals({value:500, unit: 'B'})
    it(humanUnit(size.kilobit, 'KB')).deepEquals({value:500, unit: 'KB'})
    it(humanUnit(size.edgecase)).deepEquals({value:1023, unit: 'B'})
    it(humanUnit(size.kilobyte)).deepEquals({value:1, unit: 'KB'})
    it(humanUnit(size.kilobyte, 'KB')).deepEquals({value:1, unit: 'MB'})
    it(humanUnit(size.neg)).deepEquals({value:-1, unit: 'KB'})
    it(humanUnit(size.byte)).deepEquals({value:1, unit: 'B'})
    it(humanUnit(size.zero)).deepEquals({value:0, unit: 'B'})
    it(humanUnit(size.tb)).deepEquals({value:1, unit: 'TB'})
    it(humanUnit(size.small)).deepEquals({value:0.125, unit: 'B'})
    it(humanUnit(size.huge)).deepEquals({value:82718061255302770, unit: 'YB'})
    try{
        it(humanUnit(size.invld)).deepEquals({value:0, unit: 'B'})
    }catch(e){
        it(e instanceof TypeError).deepEquals(true)
    }
})

it('time', ()=>{
    const timePreset = {
        factor: [1000, 60, 60, 24],
        units: ['mili', 'sec', 'min', 'hour', 'day']
    }
    it(humanUnit(18000, 'sec', timePreset)).deepEquals({ value: 5, unit: 'hour' })
    it(humanUnit(36000, 'sec', timePreset)).deepEquals({ value: 10, unit: 'hour' })
    it(humanUnit(86400, 'sec', timePreset)).deepEquals({ value: 1, unit: 'day' })
    it(humanUnit(8640000, 'sec', timePreset)).deepEquals({ value: 100, unit: 'day' })
    it(humanUnit(1000, 'mili', timePreset)).deepEquals({ value: 1, unit: 'sec' })
    it(humanUnit(60000, 'mili', timePreset)).deepEquals({ value: 1, unit: 'min' })
})

if(require.main == module) it.run()
