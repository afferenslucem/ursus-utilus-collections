import { assert } from "chai";
import _ from '../index'
import { MinAggregator } from "./min-aggregator";

describe('MinAggregator', function () {  
    it('should find min at array', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new MinAggregator(collection).aggregate();
        const expected = 1;

        assert.deepEqual(result, expected);
    });

    it('should find min at array after select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2);

        const result = new MinAggregator(collection).aggregate();
        const expected = 1;

        assert.deepEqual(result, expected);
    });

    it('should find min at array after negative select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => -item);

        const result = new MinAggregator(collection).aggregate();
        const expected = -9;

        assert.deepEqual(result, expected);
    });

    it('should find min at array after negative select and where', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item > -7);

        const result = new MinAggregator(collection).aggregate();
        const expected = -5;

        assert.deepEqual(result, expected);
    });

    it('should find min at array after chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item > -7)
        .min();
        
        const expected = -5;

        assert.deepEqual(result, expected);
    });
});