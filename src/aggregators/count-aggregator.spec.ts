import { assert } from "chai";
import _ from '../index'
import { CountAggregator } from "./count-aggregator";

describe('CountAggregator', function () {  
    it('should return zero at empty array', () => {
        const collection = _([]);

        const result = new CountAggregator(collection).aggregate();
        const expected = 0;

        assert.deepEqual(result, expected);
    });

    it('should get count at array', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new CountAggregator(collection).aggregate();
        const expected = 7;

        assert.deepEqual(result, expected);
    });

    it('should get count at array with condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new CountAggregator(collection, item => item > 3).aggregate();
        const expected = 5;

        assert.deepEqual(result, expected);
    });

    it('should get count at array with always wrong condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new CountAggregator(collection, item => item > 9).aggregate();
        const expected = 0;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2);

        const result = new CountAggregator(collection).aggregate();
        const expected = 7;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after select with condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2);

        const result = new CountAggregator(collection, item => item > 3).aggregate();
        const expected = 6;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after select with always wrong condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2);

        const result = new CountAggregator(collection, item => item > 300).aggregate();
        const expected = 0;

        assert.deepEqual(result, expected);
    });

    it('should get count in chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).count();
        const expected = 7;

        assert.deepEqual(result, expected);
    });

    it('should get count in chaining by condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).count(item => (item % 2) == 0);
        const expected = 4;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => item ** 2)
        .where(item => item > 50)
        .count();
        const expected = 2;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining with condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 50).count(item => item > 75);

        const expected = 1;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining with always wrong condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 50).count(item => item > 700);
        const expected = 0;

        assert.deepEqual(result, expected);
    });
});