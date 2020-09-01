import { assert } from "chai";
import {AnyCustomAlgorithm} from './any.algorithm.custom'

describe('Exists Algorithm Custom', function () {  
    it('should return false', () => {
        const expected = false;

        const result = new AnyCustomAlgorithm().run([1, 2, 3, 4], item => item > 5);

        assert.equal(result, expected)
    });

    it('should return true', () => {
        const expected = true;

        const result = new AnyCustomAlgorithm().run([1, 2, 3, 4], item => item >= 4);

        assert.equal(result, expected)
    });
});