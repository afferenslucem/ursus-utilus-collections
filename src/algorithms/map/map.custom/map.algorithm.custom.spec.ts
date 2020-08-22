import { assert } from "chai";
import { MapCustomAlgorithm } from "./map.algorithm.custom";

describe('Map Algorithm Custom', function () {  
    it('should return distinct', () => {
        const expected = [1, 4, 9];

        const result = new MapCustomAlgorithm<number, number>().run([1, 2, 3], item => item ** 2);

        assert.deepEqual(result, expected)
    });
});