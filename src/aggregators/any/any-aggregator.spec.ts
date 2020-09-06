import { assert } from "chai";
import _ from '../../index'
import { AnyAggregator } from "./any-aggregator";

describe('AnyAggregator', function () {  
    it('should return false at empty array', () => {
        const collection = _([]);

        const result = new AnyAggregator(collection, item => item == 3).aggregate();
        const expected = false;

        assert.deepEqual(result, expected);
    });

    it('should return true for truthly condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new AnyAggregator(collection, item => item > 3).aggregate();
        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy condition', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new AnyAggregator(collection, item => item < 1).aggregate();
        const expected = false;

        assert.deepEqual(result, expected);
    });

    it('should return true for truthly condition after where and select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 25);

        const result = new AnyAggregator(collection, item => item === 81).aggregate();
        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy condition after where and select', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 25);

        const result = new AnyAggregator(collection, item => item === 16).aggregate();
        const expected = false;

        assert.deepEqual(result, expected);
    });

    it('should return true for trusly contains condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).any(item => item === 9);

        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy contains condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).any(item => item === 10);
        const expected = false;

        assert.deepEqual(result, expected);
    });
});