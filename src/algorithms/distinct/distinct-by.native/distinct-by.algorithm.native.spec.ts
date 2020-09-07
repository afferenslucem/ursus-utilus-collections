import {DistinctByNativeAlgorithm} from './distinct-by.algorithm.native'
import { assert } from "chai";

describe('DistinctBy Algorithm Native', function () {  
    it('should return distinct', () => {
        const expected = [[1, 1], [3, 2]];

        const result = new DistinctByNativeAlgorithm().run([[1, 1], [2, 1], [3, 2]], (a, b) => a[1] == b[1]);

        assert.deepEqual(result, expected)
    });
});