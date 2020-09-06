import { assert } from "chai";
import _ from '../../index'
import { CountWhileAggregator } from "./count-while-aggregator";

describe('CountWhileAggregator', function () {  
    it('should return zero at empty array', () => {
        const collection = _([]);

        const result = new CountWhileAggregator(collection, item => item).aggregate();
        const expected = 0;

        assert.deepEqual(result, expected);
    });

    it('should get count at array', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        const result = new CountWhileAggregator(collection, item => item >= 4).aggregate();
        const expected = 3;

        assert.deepEqual(result, expected);
    });

    it('should get count at array', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).countWhile(item => item >= 4);

        const expected = 3;

        assert.deepEqual(result, expected);
    });
});