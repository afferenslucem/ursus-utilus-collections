import { Collection, MappingCollection, DistinctCollection } from "../../collection";
import _ from '../../../index'
import { assert } from "chai";
import { DistinctAlgorithm } from "../../../algorithms/distinct/distinct/distinct.algorithm";
import { DistinctByCustomAlgorithm } from "../../../algorithms/distinct/distinct-by.custom/distinct-by.algorithm.custom";
import { DistinctByNativeAlgorithm } from "../../../algorithms/distinct/distinct-by.native/distinct-by.algorithm.native";

describe('DistinctCollection', function () {  
    it('should create', () => {
        const result = new DistinctCollection(new Collection([1, 2, 3]));
    });

    it('should return distinct', () => {
        const expected = [1, 2, 3];

        const result = new DistinctCollection(new Collection([1, 1, 2, 1, 3, 2, 3])).toArray();

        assert.deepEqual(result, expected)
    });

    it('should choose DistinctAlgorithm', () => {
        const expected = [1, 2, 3];

        const array = [1, 1, 2, 1, 3, 2, 3];

        // @ts-ignore
        const result = new DistinctCollection(new Collection(array)).chooseAlgorithm(array);

        assert.isTrue(result instanceof DistinctAlgorithm)
    });

    it('should choose DistinctByCustomAlgorithm', () => {
        const expected = [1, 2, 3];

        const array = _.range(1, 150_000).toArray();

        // @ts-ignore
        const result = new DistinctCollection(new Collection(array), item => item).chooseAlgorithm(array);

        assert.isTrue(result instanceof DistinctByCustomAlgorithm)
    });

    it('should choose DistinctByNativeAlgorithm', () => {
        const expected = [1, 2, 3];

        const array = _.range(1, 10_000).toArray();

        // @ts-ignore
        const result = new DistinctCollection(new Collection(array), item => item).chooseAlgorithm(array);

        assert.isTrue(result instanceof DistinctByNativeAlgorithm)
    });
    
    it('should return distinctBy', () => {
        const expected = [[1, 1], [3, 2]];

        const result = new DistinctCollection(new Collection([[1, 1], [2, 1], [3, 2]]), item => item[1]).toArray();

        assert.deepEqual(result, expected)
    });

    it('should return distinct in chaining', () => {
        const collection = _([1, 1, 2, 1, 3, 2, 3]);

        const expected = [1, 2, 3];

        const result = collection.distinct().toArray();

        assert.deepEqual(result, expected)
    });
    
    it('should return distinctBy in chaining', () => {
        const collection = _([[1, 1], [2, 1], [3, 2]]);

        const expected = [[1, 1], [3, 2]];

        const result = collection.distinct(item => item[1]).toArray();

        assert.deepEqual(result, expected)
    });
});