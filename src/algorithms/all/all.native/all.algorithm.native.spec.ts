import { assert } from "chai";
import {AllNativeAlgorithm} from './all.algorithm.native'

describe('All Algorithm Native', function () {  
    it('should return false', () => {
        const expected = false;

        const result = new AllNativeAlgorithm().run([1, 2, 3, 4], item => item > 3);

        assert.equal(result, expected)
    });
    
    it('should return true', () => {
        const expected = true;

        const result = new AllNativeAlgorithm().run([1, 2, 3, 4], item => item >= 1);

        assert.equal(result, expected)
    });
});