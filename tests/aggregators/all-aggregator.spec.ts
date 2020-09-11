import { assert } from "chai";
import _ from '../../src/index'

describe('AllAggregator', function () {  
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