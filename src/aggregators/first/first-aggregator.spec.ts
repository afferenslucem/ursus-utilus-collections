import { assert } from "chai";
import _ from '../../index'
import { FirstAggregator } from "./first-aggregator";

describe('FirstAggregator', function () {  
    it('should throw error on empty array', () => {
        const collection = _([]);

        const result = new FirstAggregator(collection);
        
        assert.throws(() => {
            result.aggregate();
        }, 'No matches found');
    });

    it('should throw error for always falsy condition', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstAggregator(collection, item => item > 3);
        
        assert.throws(() => {
            result.aggregate();
        }, 'No matches found');
    });

    it('should return first', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstAggregator(collection).aggregate();
        const expected = 1;
        
        assert.equal(result, expected)
    });

    it('should return first for condition', () => {
        const collection = _([1, 2, 3]);

        const result = new FirstAggregator(collection, item => item > 2).aggregate();
        const expected = 3;
        
        assert.equal(result, expected)
    });
    
    it('should return first after select and reverse', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).reverse();

        const result = new FirstAggregator(collection).aggregate();
        const expected = 64;
        
        assert.equal(result, expected)
    });
    
    it('should return first after where', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new FirstAggregator(collection).aggregate();
        const expected = 4;
        
        assert.equal(result, expected)
    });
    
    it('should return first after select and reverse with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).reverse();

        const result = new FirstAggregator(collection, item => item < 36).aggregate();
        const expected = 25;
        
        assert.equal(result, expected)
    });
    
    it('should return first after where with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new FirstAggregator(collection, item => item > 6).aggregate();
        const expected = 7;
        
        assert.equal(result, expected)
    });
    
    it('should throw error in chaining for empty collection', () => {        
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).first();
        }, 'No matches found');
    });
    
    it('should throw error in chaining for always falsy condition', () => {
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).first(item => item > 1000);
        }, 'No matches found');
    });
});