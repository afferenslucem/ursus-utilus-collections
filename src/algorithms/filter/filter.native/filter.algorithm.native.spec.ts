import {FilterNativeAlgorithm} from './filter.algorithm.native'
import { assert } from "chai";

describe('Filter Algorithm Native', function () {  
    it('should return distinct', () => {
        const expected = [1, 3, 5];

        const result = new FilterNativeAlgorithm<number>().run([1, 2, 3, 4, 5, 6], item => !!(item % 2));

        assert.deepEqual(result, expected)
    });
});