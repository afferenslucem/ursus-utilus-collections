import { assert } from "chai";
import { ReduceWithAccumulatorNativeAlgorithm } from "./reduce-with-accumulator.algorithm.native";

describe('Reduce With Accumulator Algorithm Native', function () {  
    it('should return reduced', () => {
        const expected = 24;

        const result = new ReduceWithAccumulatorNativeAlgorithm<number>().run([1, 4, 9], (a, b) => a + b, 10);

        assert.deepEqual(result, expected)
    });
});