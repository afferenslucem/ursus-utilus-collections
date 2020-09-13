import _ from '../../src/index'
import { assert } from "chai";
import { SkippingCollection, Sequence, SkippingLastCollection, SkippingWhileCollection } from '../../src/collection';
import { Exception } from '../../src/exceptions/exceptions';

describe('SkippingCollection', function () {  
    it('should create', () => {
        const result = new SkippingCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should skip', () => {
        const result = new SkippingCollection(new Sequence([1, 2, 3]), 2).toArray();

        const expected = [3];

        assert.deepEqual(result, expected)
    });

    it('should returns [] for skip count equals array len', () => {
        const result = new SkippingCollection(new Sequence([1, 2, 3]), 3).toArray();

        const expected: number[] = [];

        assert.deepEqual(result, expected)
    });

    it('should throw error when skip count greater then array len', () => {
        assert.throws(() => {
            const result = new SkippingCollection(new Sequence([1, 2, 3]), 6).toArray();
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
            const result = new SkippingCollection(new Sequence([1, 2, 3]), 6).toArray();
        }, Exception.SoManySkipping)
    });
});

describe('SkippingLastCollection', function () {  
    it('should create', () => {
        const result = new SkippingLastCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should skip', () => {
        const result = new SkippingLastCollection(new Sequence([1, 2, 3]), 2).toArray();

        const expected = [1];

        assert.deepEqual(result, expected)
    });

    it('should returns [] for skip count equals array len', () => {
        const result = new SkippingLastCollection(new Sequence([1, 2, 3]), 3).toArray();

        const expected: number[] = [];

        assert.deepEqual(result, expected)
    });

    it('should throw error when skip count greater then array len', () => {
        assert.throws(() => {
            const result = new SkippingLastCollection(new Sequence([1, 2, 3]), 6).toArray();
        }, Exception.SoManySkipping)
    });

    it('should skip from chaining', () => {
        const result = _([1, 2, 3]).skipLast(2).toArray();

        const expected = [1];

        assert.deepEqual(result, expected)
    });

    it('should skip from chaining', () => {
        const result = _([1, 2, 3, 4, 5, 6]).skipLast(2).toArray();

        const expected = [1, 2, 3, 4];

        assert.deepEqual(result, expected)
    });
});

describe('SkippingWhileCollection', function () {  
    it('should create', () => {
        const result = new SkippingWhileCollection(new Sequence([1, 2, 3]), item => item <= 2);
    });

    it('should skip while < 2', () => {
        const result = new SkippingWhileCollection(new Sequence([1, 2, 3]), item => item <= 2).toArray();

        const expected = [3];

        assert.deepEqual(result, expected)
    });

    it('should returns [] for falsy condition', () => {
        const result = new SkippingWhileCollection(new Sequence([1, 2, 3]), item => item < 6).toArray();

        const expected: number[] = [];

        assert.deepEqual(result, expected)
    });
    
    it('should skip while elements < 5', () => {
        const result = _.range(1, 10).skipWhile(item => item < 5).toArray();
            
        const expected = _.range(5, 10).toArray();
        
        assert.deepEqual(result, expected)
    });
    
    it('should skip while elements < 50', () => {
        const result = _.range(1, 10).skipWhile(item => item < 50).toArray();
            
        const expected = _.empty().toArray();
        
        assert.deepEqual(result, expected)
    });
});