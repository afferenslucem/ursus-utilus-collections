import { assert } from "chai";
import _ from '../../index'
import { Exception } from "../../exceptions/exceptions";
import {SingleOrDefaultAggregator} from './single-or-defaulr-aggregator'

describe('SingleOrDefaultAggregator', function () {  
    it('should createy', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        new SingleOrDefaultAggregator(collection);
    });
    
    it('should throw error', () => {
        const collection = _.range(1, 3);

        assert.throws(() => {
            const result = new SingleOrDefaultAggregator(collection).aggregate();
        }, Exception.SoManyElements)
    });
    
    it('should return null', () => {
        const collection = _.empty();

        const result = new SingleOrDefaultAggregator(collection).aggregate();

        const expected = null;

        assert.equal(result, expected);
    });
    
    it('should return default', () => {
        const collection = _.empty();

        const result = new SingleOrDefaultAggregator(collection, 0).aggregate();

        const expected = 0;

        assert.equal(result, expected);
    });

    it('should return alone element', () => {
        const collection = _.of(3);

        const result = new SingleOrDefaultAggregator(collection).aggregate();
        const expected = 3;

        assert.deepEqual(result, expected);
    });

    it('should return alone element', () => {
        const result = _.of(3).single();

        const expected = 3;

        assert.deepEqual(result, expected);
    });
    
    it('should throw error', () => {
        assert.throws(() => {
            const collection = _.range(1, 3).single();
        }, Exception.SoManyElements)
    });
    
    it('should return null', () => {
        const result = _.empty<number>().singleOrDefault();

        const expected = null;

        assert.deepEqual(result, expected);
    });

    it('should return default element', () => {
        const result = _.empty<number>().singleOrDefault(0);

        const expected = 0;

        assert.deepEqual(result, expected);
    });
});