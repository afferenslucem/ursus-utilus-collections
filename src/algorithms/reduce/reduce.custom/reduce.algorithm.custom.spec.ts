import { assert } from "chai";
import { ReduceCustomAlgorithm } from "./reduce.algorithm.custom";

describe('Reduce Algorithm Custom', function () {  
    it('should return reduced', () => {
        const expected = 14;

        const result = new ReduceCustomAlgorithm<number>().run([1, 4, 9], (a, b) => a + b);

        assert.equal(result, expected)
    });
});