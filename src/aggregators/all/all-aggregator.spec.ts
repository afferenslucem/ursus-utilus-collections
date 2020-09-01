import { assert } from "chai";
import _ from '../../index'
import { AllAggregator } from "./all-aggregator";

describe('AllAggregator', function () {  
    it('should return false at empty array', () => {
        const collection = _([]);

        const result = new AllAggregator(collection, item => item == 3).aggregate();
        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return true for truthly condition', () => {
        const collection = _([8, 4, 2, 4]);

        const result = new AllAggregator(collection, item => item % 2 == 0).aggregate();
        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new AllAggregator(collection, item => item % 2 == 0).aggregate();
        const expected = false;

        assert.deepEqual(result, expected);
    });

    it('should return true for trusly contains condition', () => {
        const result = _([5, 5, 3, 1, 9, 1, 7]).all(item => !!(item % 2));

        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy contains condition', () => {
        const result = _([5, 5, 4, 3, 1, 9, 1, 7]).all(item => !!(item % 2));
        const expected = false;

        assert.deepEqual(result, expected);
    });
});