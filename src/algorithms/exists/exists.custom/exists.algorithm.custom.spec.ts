import { assert } from "chai";
import {ExistsCustomAlgorithm} from './exists.algorithm.custom'

describe('Exists Algorithm Custom', function () {  
    it('should return false', () => {
        const expected = false;

        const result = new ExistsCustomAlgorithm().run([1, 2, 3, 4], item => item > 5);

        assert.equal(result, expected)
    });

    it('should return true', () => {
        const expected = true;

        const result = new ExistsCustomAlgorithm().run([1, 2, 3, 4], item => item >= 4);

        assert.equal(result, expected)
    });
});