import {DistinctByCustomAlgorithm} from './distinct-by.algorithm.custom'
import { assert } from "chai";
import { FilterCustomAlgorithm } from './filter.algorithm.custom';

describe('Filter Algorithm Custom', function () {  
    it('should return distinct', () => {
        const expected = [1, 3, 5];

        const result = new FilterCustomAlgorithm<number>().run([1, 2, 3, 4, 5, 6], item => !!(item % 2));

        assert.deepEqual(result, expected)
    });
});