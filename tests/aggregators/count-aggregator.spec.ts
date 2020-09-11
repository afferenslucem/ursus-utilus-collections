import { assert } from "chai";
import _ from '../../src/index'

describe('CountAggregator', function () {
    it('should get count in chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).count();
        const expected = 7;

        assert.deepEqual(result, expected);
    });

    it('should get count in chaining by condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).count(item => (item % 2) == 0);
        const expected = 4;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4])
        .select(item => item ** 2)
        .where(item => item > 50)
        .count();
        const expected = 2;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining with condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 50).count(item => item > 75);

        const expected = 1;

        assert.deepEqual(result, expected);
    });

    it('should get count at array after chaining with always wrong condition', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).where(item => item > 50).count(item => item > 700);
        const expected = 0;

        assert.deepEqual(result, expected);
    });
});