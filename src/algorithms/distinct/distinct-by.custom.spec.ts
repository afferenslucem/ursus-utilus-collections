import {DistinctByCustomAlgorithm} from './distinct-by.custom'
import { assert } from "chai";

describe('DistinctBy Algorithm Custom', function () {  
    it('should return distinct', () => {
        const expected = [[1, 1], [3, 2]];

        const result = new DistinctByCustomAlgorithm().run([[1, 1], [2, 1], [3, 2]], item => item[1]);

        assert.deepEqual(result, expected)
    });
});