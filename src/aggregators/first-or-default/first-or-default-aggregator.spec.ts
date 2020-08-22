import { assert } from "chai";
import _ from '../../index'
import { FirstOrDefaultAggregator } from "./first-or-default-aggregator";

describe('FirstOrDefaultAggregator', function () {  
    it('should return null on empty array', () => {
        const collection = _([]);

        const result = new FirstOrDefaultAggregator(collection).aggregate();
        const expected = null;
        
        assert.equal(result, expected);
    });

    it('should return default on empty array', () => {
        const collection = _([]);

        const result = new FirstOrDefaultAggregator(collection, undefined, 1).aggregate();
        const expected = 1;
        
        assert.equal(result, expected);
    });

    it('should return null for always falsy condition', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstOrDefaultAggregator(collection, item => item > 3).aggregate();
        const expected = null;
        
        assert.equal(result, expected);
    });

    it('should return first', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstOrDefaultAggregator(collection).aggregate();
        const expected = 1;
        
        assert.equal(result, expected)
    });

    it('should return first for condition', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstOrDefaultAggregator(collection, item => item > 2).aggregate();
        const expected = 3;
        
        assert.equal(result, expected)
    });
    
    it('should return first after select and reverse', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).reverse();

        const result = new FirstOrDefaultAggregator(collection).aggregate();
        const expected = 64;
        
        assert.equal(result, expected)
    });
    
    it('should return first after where', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new FirstOrDefaultAggregator(collection).aggregate();
        const expected = 4;
        
        assert.equal(result, expected)
    });
    
    it('should return first after select and reverse with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).reverse();

        const result = new FirstOrDefaultAggregator(collection, item => item < 36).aggregate();
        const expected = 25;
        
        assert.equal(result, expected)
    });
    
    it('should return first after where with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new FirstOrDefaultAggregator(collection, item => item > 6).aggregate();
        const expected = 7;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).firstOrDefault();
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return default in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).firstOrDefault(0);
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).firstOrDefault(null, item => item > 1000);
            
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return 0 in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).firstOrDefault(0, item => item > 1000);
            
        const expected = 0;
        
        assert.equal(result, expected)
    });
});