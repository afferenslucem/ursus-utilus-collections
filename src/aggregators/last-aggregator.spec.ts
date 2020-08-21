import { assert } from "chai";
import _ from '../index'
import { LastAggregator } from "./last-aggregator";

describe('LastAggregator', function () {  
    it('should throw error on empty array', () => {
        const collection = _([]);

        const result = new LastAggregator(collection);
        
        assert.throws(() => {
            result.aggregate();
        }, 'No matches found');
    });

    it('should throw error for always falsy condition', () => {
        const collection = _([1, 2, 3]);

        const result = new LastAggregator(collection, item => item > 3);
        
        assert.throws(() => {
            result.aggregate();
        }, 'No matches found');
    });

    it('should return last', () => {
        const collection = _([1, 2, 3]);

        const result = new LastAggregator(collection).aggregate();
        const expected = 3;
        
        assert.equal(result, expected)
    });

    it('should return last for condition', () => {
        const collection = _([1, 2, 3]);

        const result = new LastAggregator(collection, item => item > 2).aggregate();
        const expected = 3;
        
        assert.equal(result, expected)
    });
    
    it('should return last after select', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2);

        const result = new LastAggregator(collection).aggregate();
        const expected = 64;
        
        assert.equal(result, expected)
    });
    
    it('should return last after where', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item < 6);

        const result = new LastAggregator(collection).aggregate();
        const expected = 5;
        
        assert.equal(result, expected)
    });
    
    it('should return last after select and reverse with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2);

        const result = new LastAggregator(collection, item => item < 40).aggregate();
        const expected = 36;
        
        assert.equal(result, expected)
    });
    
    it('should return last after where with condition', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3);

        const result = new LastAggregator(collection, item => item < 6.6).aggregate();
        const expected = 6;
        
        assert.equal(result, expected)
    });
    
    it('should throw error in chaining for empty collection', () => {        
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).last();
        }, 'No matches found');
    });
    
    it('should throw error in chaining for always falsy condition', () => {
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).last(item => item > 1000);
        }, 'No matches found');
    });
});