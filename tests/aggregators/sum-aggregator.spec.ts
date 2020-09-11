import { assert } from "chai";
import _ from '../../src/index'
import { SumAggregator } from "./sum/sum-aggregator";

describe('SumAggregator', function () {
    it('should returns sum of range', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = collection.sum();

        assert.equal(result, expected)
    });

    it('should returns sum array with one el', () => {
        const collection = _.of(45);

        const expected = 45;

        const result = collection.sum();

        assert.equal(result, expected)
    });
});