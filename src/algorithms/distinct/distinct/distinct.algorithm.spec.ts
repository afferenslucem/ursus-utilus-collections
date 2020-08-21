import {DistinctAlgorithm} from './distinct.algorithm'
import { assert } from "chai";

describe('Distinct Algorithm', function () {  
    it('should return distinct', () => {
        const expected = [1, 2, 3];

        const result = new DistinctAlgorithm<number>().run([1, 2, 3, 1, 2, 3]);

        assert.deepEqual(result, expected)
    });
});