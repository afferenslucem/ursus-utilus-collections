import { assert } from "chai";
import _ from '../../src/index'

describe('MinAggregator', function () {

    it('should find min at array after chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item > -7)
        .min();
        
        const expected = -5;

        assert.deepEqual(result, expected);
    });

    it('should find min at array with one element', () => {
        const result = _([8])
        .min();
        
        const expected = 8;

        assert.deepEqual(result, expected);
    });

    it('should find min at array by comparing in chaining', () => {
        const result = _([[1, 2], [1, 3], [3, 0]]).min((a, b) => a[1] - b[1]);
        const expected = [3, 0];

        assert.deepEqual(result, expected);
    });

    it('should find min at array by comparing in chaining', () => {
        const result = _.range(1, 1000, 1).reverse().concat(_.range(1, 1000)).min();
        const expected = 1;

        assert.deepEqual(result, expected);
    });
});