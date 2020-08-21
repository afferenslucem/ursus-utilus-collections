import { assert } from "chai";
import { ReduceWithAccumulatorCustomAlgorithm } from './reduce-with-accumulator.algorithm.custom'

describe('Reduce With Accumulator Algorithm Custom', function () {  
    it('should return reduced', () => {
        const expected = 24;

        const result = new ReduceWithAccumulatorCustomAlgorithm<number>().run([1, 4, 9], (a, b) => a + b, 10);

        assert.deepEqual(result, expected)
    });
});