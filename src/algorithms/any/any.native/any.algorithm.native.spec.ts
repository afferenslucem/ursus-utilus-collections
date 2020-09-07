import { assert } from "chai";
import {AnyNativeAlgorithm} from './any.algorithm.native'

describe('Exists Algorithm Native', function () {  
    it('should return false', () => {
        const expected = false;

        const result = new AnyNativeAlgorithm().run([1, 2, 3, 4], item => item > 5);

        assert.equal(result, expected)
    });
    
    it('should return true', () => {
        const expected = true;

        const result = new AnyNativeAlgorithm().run([1, 2, 3, 4], item => item >= 4);

        assert.equal(result, expected)
    });
});