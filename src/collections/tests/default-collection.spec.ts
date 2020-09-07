import { Collection, TakingCollection, PrependCollection, DefaultCollection } from "../collection";
import _ from '../../index'
import { assert } from "chai";

describe('DefaultCollection', function () {  
    it('should create from collection', () => {
        const result = new DefaultCollection(new Collection([1, 2, 3]), new Collection([1, 2, 3]));
    });

    it('should create from array', () => {
        const result = new DefaultCollection(new Collection([1, 2, 3]), [1, 2, 3]);
    });

    it('should create from object', () => {
        const result = new DefaultCollection(new Collection([1, 2, 3]), 1);
    });

    it('should return default from collection', () => {
        const result = new DefaultCollection(new Collection([]), new Collection([1, 2, 3])).toArray();

        const expected = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should return default from array', () => {
        const result = new DefaultCollection(new Collection([]), [1, 2, 3]).toArray();

        const expected = [1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should return default from object', () => {
        const result = new DefaultCollection(new Collection([]), 1).toArray();

        const expected = [1];

        assert.deepEqual(result, expected)
    });

    it('should return default', () => {
        const result = _([1, 2, 3, 4, 5]).where(item => item > 7).defaultIfEmpty(0).toArray();

        const expected = [0];

        assert.deepEqual(result, expected)
    });
});