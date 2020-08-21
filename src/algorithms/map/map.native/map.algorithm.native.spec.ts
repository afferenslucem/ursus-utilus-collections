import { assert } from "chai";
import { MapNativeAlgorithm } from "./map.algorithm.native";

describe('Map Algorithm Native', function () {  
    it('should return distinct', () => {
        const expected = [1, 4, 9];

        const result = new MapNativeAlgorithm<number, number>().run([1, 2, 3], item => item ** 2);

        assert.deepEqual(result, expected)
    });
});