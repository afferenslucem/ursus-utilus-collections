import { assert } from "chai";
import { equalityCompare } from "../../src/utils/equality-compare";

describe('equalityCompare', function () {  
    it('should return true', () => {
        assert.isTrue(equalityCompare(1, 1))
    });
    it('should return false', () => {
        // @ts-ignore
        assert.isFalse(equalityCompare(1, '1'))
    });
});