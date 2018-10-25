import camelCase from 'camel-case';

let instance = null;

export class Cacher{
    cache = {};

    constructor(){
        if(!instance){
            instance = this;
        }
        return instance
    }

    cacheValue( key , value ){
        this.cache[ camelCase(key) ] = value;
    }

    isValueCached(key){
        return this.getCachValue(key);
    }

    getCachValue(key){
        return this.cache[ camelCase(key) ];
    }
}