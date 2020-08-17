import { assert } from "chai";
import _ from '../index'
import { MaxAggregator } from "./max-aggregator";

describe('MaxAggregator', function () {  
    it('should find max at array', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new MaxAggregator(collection).aggregate();
        const expected = 9;

        assert.deepEqual(result, expected);
    });

    it('should find max at array after select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2);

        const result = new MaxAggregator(collection).aggregate();
        const expected = 81;

        assert.deepEqual(result, expected);
    });

    it('should find max at array after negative select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => -item);

        const result = new MaxAggregator(collection).aggregate();
        const expected = -1;

        assert.deepEqual(result, expected);
    });

    it('should find max at array after negative select and where', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item < -7);

        const result = new MaxAggregator(collection).aggregate();
        const expected = -8;

        assert.deepEqual(result, expected);
    });

    it('should find max at array after chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item < -7)
        .max();
        
        const expected = -8;

        assert.deepEqual(result, expected);
    });
});