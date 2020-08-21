import { FilteringCollection, Collection } from "../../collection";
import _ from '../../../index'
import { assert } from "chai";
import { FilterCustomAlgorithm } from "../../../algorithms/filter/filter.custom/filter.algorithm.custom";
import { FilterNativeAlgorithm } from "../../../algorithms/filter/filter.native/filter.algorithm.native";

describe('FilteringCollection', function () {  
    it('should create', () => {
        const result = new FilteringCollection(new Collection([1, 2, 3]), item => !!item);
    });

    it('should return filtered from toArray()', () => {
        const result = new FilteringCollection(new Collection([8, 5, 4, 2, 9, 1, 4]), item => (item % 2) == 0).toArray();
        const expected = [8, 4, 2, 4];

        assert.deepEqual(result, expected);
    });

    it('should return double filtered from toArray()', () => {
        const result = new FilteringCollection(new Collection([8, 5, 4, 2, 9, 1, 4]), item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected = [4, 4];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection', () => {
        const result = new FilteringCollection(new Collection([]), item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });
    
    it('should return filtered from chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).where(item => (item % 2) == 0).toArray();
        const expected = [8, 4, 2, 4];

        assert.deepEqual(result, expected);
    });

    it('should return double filtered from chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).where(item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected = [4, 4];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection from chaining', () => {
        const result = _([]).where(item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });

    it('should choose FilterCustomAlgorithm', () => {
        const expected = [1, 2, 3];

        const array = _.range(1, 150_000).toArray();

        // @ts-ignore
        const result = new FilteringCollection(new Collection(array), item => item).chooseAlgorithm(array);

        assert.isTrue(result instanceof FilterCustomAlgorithm)
    });

    it('should choose FilterNativeAlgorithm', () => {
        const expected = [1, 2, 3];

        const array = _.range(1, 10_000).toArray();

        // @ts-ignore
        const result = new FilteringCollection(new Collection(array), item => item).chooseAlgorithm(array);

        assert.isTrue(result instanceof FilterNativeAlgorithm)
    });    
});
