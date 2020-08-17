import { assert } from "chai";
import _ from '../index'
import { SumAggregator } from "./sum-aggregator";

describe('SumAggregator', function () {
    it('should return 1 for array [1]', () => {
        const collection = _([1]);

        const expected = 1;

        const result = new SumAggregator(collection).aggregate();

        assert.equal(result, expected)
    });

    it('aggregator should returns sum of range', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = new SumAggregator(collection).aggregate();

        assert.equal(result, expected)
    });
    
    it('aggregator should returns sum of strings', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = 'abc';

        const result = new SumAggregator(collection).aggregate();

        assert.equal(result, expected)
    });
    
    it('aggregator should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        const result = new SumAggregator(collection, (a, b) => Number(a) + Number(b)).aggregate();

        assert.equal(result, expected)
    });

    it('should returns sum of range', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = collection.sum();

        assert.equal(result, expected)
    });
    
    it('should returns sum of strings', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = 'abc';

        const result = collection.sum();

        assert.equal(result, expected)
    });
    
    it('should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        const result = collection.sum((a, b) => Number(a) + Number(b));

        assert.equal(result, expected)
    });
});