import { assert } from "chai";
import { ReduceNativeAlgorithm } from "./reduce.algorithm.native";

describe('Reduce Algorithm Native', function () {  
    it('should return reduced', () => {
        const expected = 14;

        const result = new ReduceNativeAlgorithm<number>().run([1, 4, 9], (a, b) => a + b);

        assert.equal(result, expected)
    });
});