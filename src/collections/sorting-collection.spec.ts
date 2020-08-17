import { Collection, SortingCollection } from "./collection";
import _ from '../index'
import { assert } from "chai";

describe('SortingCollection', function () {
    it('should create', () => {
        const result = new SortingCollection(new Collection([1, 2, 3]));
    });

    it('should sort', () => {
        const items = [3, 2, 1]
        const result = new SortingCollection(new Collection(items)).toArray();

        const expected = [1, 2, 3];

        assert.deepEqual(result, expected)
        assert.deepEqual(items, [3, 2, 1])
    });

    it('should sort by lambda', () => {
        const result = new SortingCollection(new Collection([1, 2, 3]), {
            compare: (a, b) => b - a
        }).toArray();

        const expected = [3, 2, 1];

        assert.deepEqual(result, expected)
    });
        
    it('should sort by field', () => {
        const result = new SortingCollection(new Collection([[3, 4], [2, 4], [2, 3], [1, 2]]), {
            mapping: item => item[0]
        }).toArray();

        const expected = [[1, 2], [2, 4], [2, 3], [3, 4]];

        assert.deepEqual(result, expected)
    });

    it('should sort cascade', () => {
        const result = new SortingCollection(new Collection([[3, 4], [2, 4], [2, 3], [1, 2]]), {
            mapping: item => item[0]
        }).thenBy(item => item[1]).toArray();

        const expected = [[1, 2], [2, 3], [2, 4], [3, 4]];

        assert.deepEqual(result, expected)
    });

    it('should sort cascade with condition', () => {
        const result = new SortingCollection<number[], number>(new Collection([[3, 4], [2, 4], [2, 3], [1, 2]]), {
            mapping: item => item[0],
            compare: (first, second) => second - first
        }).thenBy(item => item[1], (first, second) => second - first).toArray();

        const expected = [[3, 4], [2, 4], [2, 3], [1, 2]];

        assert.deepEqual(result, expected)
    });
    
    it('should sort in chaining', () => {
        const items = [3, 2, 1];
        const result = _(items).sort().toArray();

        const expected = [1, 2, 3];

        assert.deepEqual(result, expected)
        assert.deepEqual(items, [3, 2, 1])
    });
    
    it('should sort by field in chaining', () => {
        const collection = _([[3, 4], [2, 4], [2, 3], [1, 2]]);

        const sorted = collection.sortBy(item => item[0]).toArray();

        assert.deepEqual(sorted, [[1, 2], [2, 4], [2, 3], [3, 4]])
    });

    it('should sort cascade in chaining', () => {
        const collection = _([[3, 4], [2, 4], [2, 3], [1, 2]]);

        const sorted = collection.sortBy(item => item[0]).thenBy(item => item[1]).toArray();

        assert.deepEqual(sorted, [[1, 2], [2, 3], [2, 4], [3, 4]])
    });

    it('should sort cascade with condition in chaining', () => {
        const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

        const sorted = collection.sortBy(item => item[0], (first, second) => second - first)
        .thenBy(item => item[1], (first, second) => second - first).toArray();

        assert.deepEqual(sorted, [[3, 4], [2, 4], [2, 3], [1, 2]])
    });
});