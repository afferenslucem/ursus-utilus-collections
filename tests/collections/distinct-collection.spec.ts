import _ from '../../src/index'
import { assert } from "chai";
import { DistinctCollection, Collection } from '../../src/collection';

describe('DistinctCollection', function () {  
    it('should create', () => {
        const result = new DistinctCollection(new Collection([1, 2, 3]));
    });

    it('should return distinct', () => {
        const expected = [1, 2, 3];

        const result = new DistinctCollection(new Collection([1, 1, 2, 1, 3, 2, 3])).toArray();

        assert.deepEqual(result, expected)
    });
    
    it('should return distinctBy', () => {
        const expected = [[1, 1], [3, 2]];

        const result = new DistinctCollection(new Collection([[1, 1], [2, 1], [3, 2]]), (a, b) => a[1] == b[1]).toArray();

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

        const result = collection.distinct((a, b) => a[1] == b[1]).toArray();
        const control = collection.distinct().toArray();

        assert.deepEqual(result, expected)
        assert.deepEqual(control, collection.toArray())
    });
});