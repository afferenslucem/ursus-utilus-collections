import _ from '../../src/index'
import { assert } from "chai";
import { TakingCollection, Sequence, TakingWhileCollection, TakingLastCollection } from '../../src/sequence';

describe('TakingCollection', function () {  
    it('should create', () => {
        const result = new TakingCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should take', () => {
        const result = new TakingCollection(new Sequence([1, 2, 3]), 2).toArray();

        const expected = [1, 2];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count equals array len', () => {
        const result = new TakingCollection(new Sequence([1, 2, 3]), 3).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count greater then array len', () => {
        const result = new TakingCollection(new Sequence([1, 2, 3]), 6).toArray();

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

describe('TakingWhileCollection', function () {  
    it('should create', () => {
        const result = new TakingWhileCollection(new Sequence([1, 2, 3]), item => item < 2);
    });

    it('should take < 3', () => {
        const result = new TakingWhileCollection(new Sequence([1, 2, 3]), item => item < 3).toArray();

        const expected = [1, 2];

        assert.deepEqual(result, expected)
    });

    it('should take for truthly condition', () => {
        const result = new TakingWhileCollection(new Sequence([1, 2, 3]), item => item < 6).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns < 5', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7]).takeWhile(item => item < 4).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });
});

describe('TakingLastCollection', function () {  
    it('should create', () => {
        const result = new TakingLastCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should take', () => {
        const result = new TakingLastCollection(new Sequence([1, 2, 3]), 2).toArray();

        const expected = [2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count equals array len', () => {
        const result = new TakingLastCollection(new Sequence([1, 2, 3]), 3).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should returns array for take count greater then array len', () => {
        const result = new TakingLastCollection(new Sequence([1, 2, 3]), 6).toArray();

        const expected: number[] = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should take from chaining', () => {
        const result = _([1, 2, 3]).takeLast(2).toArray();

        const expected = [2, 3];

        assert.deepEqual(result, expected)
    });
});