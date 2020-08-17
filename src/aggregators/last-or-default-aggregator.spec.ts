import { assert } from "chai";
import _ from '../index'
import { LastOrDefaultAggregator } from "./last-or-default-aggregator";

describe('LastOrDefaultAggregator', function () {  
    it('should return null on empty array', () => {
        const collection = _([]);

        const result = new LastOrDefaultAggregator(collection).aggregate();
        const expected = null;
        
        assert.equal(result, expected);
    });

    it('should return default on empty array', () => {
        const collection = _([]);

        const result = new LastOrDefaultAggregator(collection, undefined, 1).aggregate();
        const expected = 1;
        
        assert.equal(result, expected);
    });

    it('should return null for always falsy condition', () => {
        const collection = _([1, 2, 3]);

        const result = new LastOrDefaultAggregator(collection, item => item > 3).aggregate();
        const expected = null;
        
        assert.equal(result, expected);
    });

    it('should return last', () => {
        const collection = _([1, 2, 3]);

        const result = new LastOrDefaultAggregator(collection).aggregate();
        const expected = 3;
        
        assert.equal(result, expected)
    });

    it('should return last for condition', () => {
        const collection = _([1, 2, 3]);

        const result = new LastOrDefaultAggregator(collection, item => item < 3).aggregate();
        const expected = 2;
        
        assert.equal(result, expected)
    });
    
    it('should return last after select', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2);

        const result = new LastOrDefaultAggregator(collection).aggregate();
        const expected = 64;
        
        assert.equal(result, expected)
    });
    
    it('should return last after where', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item < 5);

        const result = new LastOrDefaultAggregator(collection).aggregate();
        const expected = 4;
        
        assert.equal(result, expected)
    });
    
    it('should return last after select with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2);

        const result = new LastOrDefaultAggregator(collection, item => item < 40).aggregate();
        const expected = 36;
        
        assert.equal(result, expected)
    });
    
    it('should return last after where with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new LastOrDefaultAggregator(collection, item => item < 6.6).aggregate();
        const expected = 6;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).lastOrDefault();
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return default in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).lastOrDefault(0);
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).lastOrDefault(null, item => item > 1000);
            
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return 0 in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).lastOrDefault(0, item => item > 1000);
            
        const expected = 0;
        
        assert.equal(result, expected)
    });
});