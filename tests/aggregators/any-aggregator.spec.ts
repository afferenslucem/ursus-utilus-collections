import { assert } from "chai";
import _ from '../../src/index'

describe('AnyAggregator', function () {  
    it('should return true for trusly contains condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).any(item => item === 9);

        const expected = true;

        assert.deepEqual(result, expected);
    });

    it('should return false for falsy contains condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).any(item => item === 10);
        const expected = false;

        assert.deepEqual(result, expected);
    });

    it('should return true for trusly contains condition after where', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).where(item => !!(item % 2)).any(item => item === 1);
        const expected = true;

        assert.deepEqual(result, expected);
    });
});