import { assert } from "chai";
import _ from '../../index'
import {SingleAggregator} from './single-aggregator';
import { Exception } from "../../exceptions/exceptions";

describe('SingleAggregator', function () {  
    it('should createy', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        new SingleAggregator(collection);
    });
    
    it('should throw error', () => {
        const collection = _.range(1, 3);

        assert.throws(() => {
            const result = new SingleAggregator(collection).aggregate();
        }, Exception.SoManyElements)
    });
    
    it('should throw error', () => {
        const collection = _.empty();

        assert.throws(() => {
            const result = new SingleAggregator(collection).aggregate();
        }, Exception.SoManyElements)
    });

    it('should return alone element', () => {
        const collection = _.of(3);

        const result = new SingleAggregator(collection).aggregate();
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
    
    it('should throw error', () => {
        assert.throws(() => {
            _.empty().single();
        }, Exception.SoManyElements)
    });
});