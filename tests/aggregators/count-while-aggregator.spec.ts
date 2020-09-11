import { assert } from "chai";
import _ from '../../src/index'

describe('CountWhileAggregator', function () {
    it('should get count at array', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).countWhile(item => item >= 4);

        const expected = 3;

        assert.deepEqual(result, expected);
    });
});