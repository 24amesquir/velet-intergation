class NumberGenerator{
    constructor(){
		let mathObj = new math();
		this.dis = mathObj.seedrandom();
    }

    get(){
        return this.rd();
    }
}

class RealNumberGenerator extends NumberGenerator{
    constructor(){
        super();
		let mathObj = new math();
		this.dis = mathObj.seedrandom();
    }

    getUnder(max){
        return this.get() * max;
    }

    getRange(min, max){
        return min + this.get() * (max - min);
    }

    getRange(width){
        return this.getRange(-width * 0.5, width * 0.5);
    }

    getFullRange(width){
        return this.getRange(2.0 * width);
    }

    proba(threshold){
        return this.get() < threshold;
    }

    getNormal(mean, std){
        return this.dis.normal(mean, std);
    }

    getNormalRange(min, max){
        return this.getNormal((min + max) * 0.5, (max - min) * 0.5);
    }
}

class IntegerNumberGenerator extends NumberGenerator{
    constructor(){
        super();
    }

    getUnder(max){
        return Math.floor(this.get() * (max + 1));
    }

    getRange(min, max){
        return Math.floor(this.get() * (max - min + 1)) + min;
    }
}

class RNG{
    static get(){
        return RNG.gen.get();
    }

    static getUnder(max){
        return RNG.gen.getUnder(max);
    }

    static getRange(min, max){
        return RNG.gen.getRange(min, max);
    }

    static getRange(width){
        return RNG.gen.getRange(width);
    }

    static getFullRange(width){
        return RNG.gen.getFullRange(width);
    }

    static proba(threshold){
        return RNG.gen.proba(threshold);
    }

    static getNormal(mean, std){
        return RNG.gen.getNormal(mean, std);
    }

    static getNormalRange(min, max){
        return RNG.gen.getNormalRange(min, max);
    }
}

RNG.gen = new RealNumberGenerator();
