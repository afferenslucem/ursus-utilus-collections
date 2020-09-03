import { assert } from "chai";
import {AllCustomAlgorithm} from './all.algorithm.custom'

describe('All Algorithm Custom', function () {  
    it('should return false', () => {
        const expected = false;

        const result = new AllCustomAlgorithm().run([1, 2, 3, 4], item => item > 4);

        assert.equal(result, expected)
    });

    it('should return true', () => {
        const expected = true;

        const result = new AllCustomAlgorithm().run([1, 2, 3, 4], item => item >= 0);

        assert.equal(result, expected)
    });
});