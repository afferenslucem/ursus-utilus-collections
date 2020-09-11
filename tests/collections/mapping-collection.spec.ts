import _ from '../../src/index'
import { assert } from "chai";
import { MappingCollection, Collection } from '../../src/collection';

describe('MappingCollection', function () {  
    it('should create', () => {
        const result = new MappingCollection(new Collection([1, 2, 3]), item => !!item);
    });

    it('should return mapped from toArray()', () => {
        const result = new MappingCollection(new Collection([8, 5, 4, 2, 9, 1, 4]), item => item + 1).toArray();
        const expected = [9, 6, 5, 3, 10, 2, 5];

        assert.deepEqual(result, expected);
    });

    it('should return double mapped from toArray()', () => {
        const result = new MappingCollection(new Collection([8, 5, 4, 2, 9, 1, 4]), item => item + 1).select(item => item / 2).toArray();
        const expected = [4.5, 3, 2.5, 1.5, 5, 1, 2.5];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection', () => {
        const result = new MappingCollection(new Collection([]), item => item + 1).select(item => item / 2).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });

    it('should return mapped from chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item + 1).toArray();
        const expected = [9, 6, 5, 3, 10, 2, 5];

        assert.deepEqual(result, expected);
    });

    it('should maps to other type from chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item ** 2).select(item => item.toString()).where(item => item.startsWith('1')).toArray();
        const expected = ['16', '1', '16'];

        assert.deepEqual(result, expected);
    });

    it('should return double mapped from toArray()', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).select(item => item + 1).select(item => item / 2).toArray();
        const expected = [4.5, 3, 2.5, 1.5, 5, 1, 2.5];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection', () => {
        const result = _([]).select(item => item + 1).select(item => item / 2).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });
    it('should return empty for empty collection from chaining', () => {
        const result = _([]).where(item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });

    // it('should choose MapCustomAlgorithm', () => {
    //     const expected = [1, 2, 3];

    //     const array = _.range(1, 150_000).toArray();

    //     // @ts-ignore
    //     const result = new MappingCollection(new Collection(array), item => item).chooseAlgorithm(array);

    //     assert.isTrue(result instanceof MapCustomAlgorithm)
    // });

    // it('should choose MapNativeAlgorithm', () => {
    //     const expected = [1, 2, 3];

    //     const array = _.range(1, 10_000).toArray();

    //     // @ts-ignore
    //     const result = new MappingCollection(new Collection(array), item => item).chooseAlgorithm(array);

    //     assert.isTrue(result instanceof MapNativeAlgorithm)
    // });    
});