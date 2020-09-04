import { Collection, TakingCollection, ZipCollection } from "../../collection";
import _ from '../../../index'
import { assert } from "chai";
import { ZipCustomAlgorithm } from "../../../algorithms/zip/zip.custom/zip.algorithm.custom";
import { ZipNativeAlgorithm } from "../../../algorithms/zip/zip.native/zip.algorithm.native";

describe('ZipCollection', function () {  
    it('should create', () => {
        const result = new ZipCollection(new Collection([1, 2, 3]), new Collection([3, 2, 1]));
    });

    it('should zip', () => {
        const result = new ZipCollection(new Collection([1, 2, 3]), new Collection([3, 2, 1])).toArray();

        const expected = [[1, 3], [2, 2], [3, 1]];

        assert.deepEqual(result, expected)
    });

    it('should zip by func', () => {
        const result = new ZipCollection(new Collection([1, 2, 3]), new Collection([3, 2, 1]), (a, b) => a + b).toArray();

        const expected = [4, 4, 4];

        assert.deepEqual(result, expected)
    });

    it('should zip with shorter collection', () => {
        const result = new ZipCollection(new Collection([1, 2, 3, 4]), new Collection([3, 2, 1])).toArray();

        const expected = [[1, 3], [2, 2], [3, 1]];

        assert.deepEqual(result, expected)
    });

    it('should zip with longer collection', () => {
        const result = new ZipCollection(new Collection([1, 2, 3]), new Collection([3, 2, 1, 0])).toArray();

        const expected = [[1, 3], [2, 2], [3, 1]];

        assert.deepEqual(result, expected)
    });

    it('should zip with array', () => {
        const result = _([1, 2, 3]).zip([3, 2, 1]).toArray();

        const expected = [[1, 3], [2, 2], [3, 1]];

        assert.deepEqual(result, expected)
    });

    it('should zip with array by func', () => {
        const result = _([1, 2, 3]).zip([4, 2, 3], (a, b) => a + b).toArray();

        const expected = [5, 4, 6];

        assert.deepEqual(result, expected)
    });

    it('should zip with collection', () => {
        const result = _([1, 2, 3]).zip(_([3, 2, 1])).toArray();

        const expected = [[1, 3], [2, 2], [3, 1]];

        assert.deepEqual(result, expected)
    });

    it('should zip with collection by func', () => {
        const result = _([1, 2, 3]).zip(_([3, 2, 1]), (a, b) => a + b).toArray();

        const expected = [4, 4, 4];

        assert.deepEqual(result, expected)
    });

    it('should choose ZipCustomAlgorithm', () => {
        const array = _.range(1, 150_000).toArray();

        // @ts-ignore
        const result = new ZipCollection(new Collection(array), _([])).chooseAlgorithm(array);

        assert.isTrue(result instanceof ZipCustomAlgorithm)
    });

    it('should choose ZipNativeAlgorithm', () => {
        const array = _.range(1, 10_000).toArray();

        // @ts-ignore
        const result = new ZipCollection(new Collection(array), _([])).chooseAlgorithm(array);

        assert.isTrue(result instanceof ZipNativeAlgorithm)
    });  
});