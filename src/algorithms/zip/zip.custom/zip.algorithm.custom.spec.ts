import { assert } from "chai";
import {ZipCustomAlgorithm} from './zip.algorithm.custom'

describe('Zip Algorithm Custom', function () {  
    it('should return zipped', () => {
        const expected = [[3, 1], [2, 2], [1, 3]];

        const result = new ZipCustomAlgorithm<number, number, [number, number]>().run([3, 2, 1], [1, 2, 3], (a, b) => [a, b]);

        assert.deepEqual(result, expected)
    });

    it('should return zipped', () => {
        const expected = [[1, 3], [2, 2], [3, 1]];

        const result = new ZipCustomAlgorithm<number, number, [number, number]>().run([1, 2, 3], [3, 2, 1], (a, b) => [a, b]);

        assert.deepEqual(result, expected)
    });
});