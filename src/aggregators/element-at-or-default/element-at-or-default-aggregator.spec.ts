import { assert } from "chai";
import _ from '../../index'
import { ElementAtOrDefaultAggregator } from "./element-at-or-default-aggregator";

describe('ElementAtOrDefaultAggregator', function () {  
    it('should return null on empty array', () => {
        const collection = _([]);

        const result = new ElementAtOrDefaultAggregator(collection, 0, null).aggregate();
        const expected = null;
        
        assert.equal(result, expected);
    });

    it('should return default on empty array', () => {
        const collection = _([]);

        const result = new ElementAtOrDefaultAggregator(collection, 0, 1).aggregate();
        const expected = 1;
        
        assert.equal(result, expected);
    });

    it('should return first', () => {
        const collection = _([1, 2, 3]);

        const result = new ElementAtOrDefaultAggregator(collection, 0, null).aggregate();
        const expected = 1;
        
        assert.equal(result, expected)
    });
    
    it('should return element', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).elementAtOrDefault(3);

        const expected = 4;
        
        assert.equal(result, expected)
    });
    
    it('should return default', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).elementAtOrDefault(10);
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return default overrided', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).elementAtOrDefault(10, 0);
        const expected = 0;
        
        assert.equal(result, expected)
    });
});