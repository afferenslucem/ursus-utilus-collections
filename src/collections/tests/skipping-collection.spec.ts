import { Collection, SkippingCollection } from "../collection";
import _ from '../../index'
import { assert } from "chai";
import { Exception } from "../../exceptions/exceptions";

describe('SkippingCollection', function () {  
    it('should create', () => {
        const result = new SkippingCollection(new Collection([1, 2, 3]), 2);
    });

    it('should skip', () => {
        const result = new SkippingCollection(new Collection([1, 2, 3]), 2).toArray();

        const expected = [3];

        assert.deepEqual(result, expected)
    });

    it('should returns [] for skip count equals array len', () => {
        const result = new SkippingCollection(new Collection([1, 2, 3]), 3).toArray();

        const expected: number[] = [];

        assert.deepEqual(result, expected)
    });

    it('should throw error when skip count greater then array len', () => {
        assert.throws(() => {
            const result = new SkippingCollection(new Collection([1, 2, 3]), 6).toArray();
        }, Exception.SoManySkipping)
    });

    it('should skip from chaining', () => {
        const result = _([1, 2, 3]).skip(2).toArray();

        const expected = [3];

        assert.deepEqual(result, expected)
    });

    it('should returns [] for skip count equals array len from chaining', () => {
        const result = _([1, 2, 3]).skip(3).toArray();

        const expected: number[] = [];

        assert.deepEqual(result, expected)
    });

    it('should throw error when skip count greater then array len', () => {
        assert.throws(() => {
            const result = new SkippingCollection(new Collection([1, 2, 3]), 6).toArray();
        }, Exception.SoManySkipping)
    });
});