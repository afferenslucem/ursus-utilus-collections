import { assert } from "chai";
import _ from '../../src/index'

describe('MaxAggregator', function () {
    it('should find max at array in chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => -item)
        .where(item => item < -7)
        .max();
        
        const expected = -8;

        assert.deepEqual(result, expected);
    });

    it('should find max at array in chaining', () => {
        const result = _([[1, 3], [2, 0], [3, 0]]).max((a, b) => a[1] - b[1]);

        const expected = [1, 3];

        assert.deepEqual(result, expected);
    });

    it('should max at array with one element', () => {
        const result = _([1]).max();

        const expected = 1;

        assert.deepEqual(result, expected);
    });
});