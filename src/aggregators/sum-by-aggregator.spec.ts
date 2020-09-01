import { assert } from "chai";
import _ from '../index'
import { SumAggregator } from "./sum-aggregator";
import { SumByAggregator } from "./sum-by-aggregator";

describe('SumAggregator', function () {
    it('aggregator should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        // @ts-ignore
        const result = new SumByAggregator(collection, (a, b) => Number(a) + Number(b)).aggregate();

        assert.equal(result, expected)
    });
    
    it('should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        const result = collection.sum(item => Number(item)).toString();

        assert.equal(result, expected)
    });
});