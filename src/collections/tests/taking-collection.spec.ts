import { Collection, TakingCollection } from "../collection";
import _ from '../../index'
import { assert } from "chai";

describe('TakingCollection', function () {  
    it('should create', () => {
        const result = new TakingCollection(new Collection([1, 2, 3]), 2);
    });

    it('should skip', () => {
        const result = new TakingCollection(new Collection([1, 2, 3]), 2).toArray();

        const expected = [1, 2];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count equals array len', () => {
        const result = new TakingCollection(new Collection([1, 2, 3]), 3).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count greater then array len', () => {
        const result = new TakingCollection(new Collection([1, 2, 3]), 6).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should take from chaining', () => {
        const result = _([1, 2, 3]).take(2).toArray();

        const expected = [1, 2];

        assert.deepEqual(result, expected)
    });

    it('should returns array for taking count equals array len from chaining', () => {
        const result = _([1, 2, 3]).take(3).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count greater then array len', () => {
        const result = _([1, 2, 3]).take(6).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });
});