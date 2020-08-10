import _ from '../../src';
import { Collection } from '../../src/collections/collection';
import { assert } from 'chai';

describe('Index', function () {  
    it('should wrap native array', () => {
        const expected = new Collection([1, 2, 3]);

        const result = _([1, 2, 3]);

        assert.deepEqual(expected, result);
    }); 

    it('should filter', () => {
        const expected = [2, 4];

        const result = _([1, 2, 3, 4]).where(item => !(item % 2)).toArray();

        assert.deepEqual(expected, result);
    });

    it('should map', () => {
        const expected = ['2', '4', '6', '8'];

        const result = _([1, 2, 3, 4]).select(item => (item * 2).toString()).toArray();

        assert.deepEqual(expected, result);
    });

    it('should skip', () => {
        const expected = [4, 5, 6];

        const result = _([1, 2, 3, 4, 5, 6]).skip(3).toArray();

        assert.deepEqual(expected, result);
    });

    it('should take', () => {
        const expected = [1, 2, 3];

        const result = _([1, 2, 3, 4, 5, 6]).take(3).toArray();

        assert.deepEqual(expected, result);
    });

    it('should take and skip combine', () => {
        const expected = [5, 6, 7, 8];

        const result = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .skip(2).take(8).skip(2).take(4).toArray();

        assert.deepEqual(expected, result);
    });

    it('should take first', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        
        const first = collection.first(); // returns 1
        assert.equal(first, 1, 'Return wrong first value');
        
        const firstByCondition = collection.first(item => item > 10); // returns 11
        assert.equal(firstByCondition, 11, 'Return wrong first filtered value');
        
        assert.throws(() => {
            collection.first(item => item > 12); // throws error
        }, 'No matches found');
    });

    it('should take first or return default', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        
        const first = collection.firstOrDefault(); // returns 1
        assert.equal(first, 1, 'Return wrong first value');
        
        const firstByCondition = collection.firstOrDefault(item => item > 10); // returns 11
        assert.equal(firstByCondition, 11, 'Return wrong first filtered value');
        
        const emptyFirst = collection.firstOrDefault(item => item > 12); // returns null
        assert.equal(emptyFirst, null, 'Return wrong default value');
        
        const defaultFirst = collection.firstOrDefault(item => item > 12, 0); // returns null
        assert.equal(defaultFirst, 0, 'Return wrong overrided default value');
    });

    it('should take last', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        
        const last = collection.last(); // returns 12
        assert.equal(last, 12, 'Return wrong last value');
        
        const lastByCondition = collection.last(item => item < 3); // returns 2
        assert.equal(lastByCondition, 2, 'Return wrong last filtered value');
        
        assert.throws(() => {
            collection.last(item => item < 1); // throws error
        }, 'No matches found');
    });

    it('should take first or return default', () => {
        const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

        const last = collection.lastOrDefault(); // returns 12
        assert.equal(last, 12, 'Return wrong last value');

        const lastByCondition = collection.lastOrDefault(item => item < 3); // returns 2
        assert.equal(lastByCondition, 2, 'Return wrong last filtered value');

        const emptylast = collection.lastOrDefault(item => item < 1); // returns null
        assert.equal(emptylast, null, 'Return wrong default');

        const defaultlast = collection.lastOrDefault(item => item < 1, 0); // returns null
        assert.equal(defaultlast, 0, 'Return wrong overrided default');
    });

    it('should sort', () => {
        const collection = _([3, 2, 1]);

        const sorted = collection.sort().toArray();

        assert.deepEqual(sorted, [1, 2, 3])
    });

    it('should sort with condition', () => {
        const collection = _([1, 2, 3]);

        const sorted = collection.sort((first, second) => second - first).toArray();

        assert.deepEqual(sorted, [3, 2, 1])
    });

    it('should sort by field', () => {
        const collection = _([[3, 4], [2, 4], [2, 3], [1, 2]]);

        const sorted = collection.sortBy(item => item[0]).toArray();

        assert.deepEqual(sorted, [[1, 2], [2, 4], [2, 3], [3, 4]])
    });

    it('should sort cascade', () => {
        const collection = _([[3, 4], [2, 4], [2, 3], [1, 2]]);

        const sorted = collection.sortBy(item => item[0]).thenBy(item => item[1]).toArray();

        assert.deepEqual(sorted, [[1, 2], [2, 3], [2, 4], [3, 4]])
    });

    it('should sort cascade with condition', () => {
        const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

        const sorted = collection.sortBy(item => item[0], (first, second) => second - first)
        .thenBy(item => item[1], (first, second) => second - first).toArray();

        assert.deepEqual(sorted, [[3, 4], [2, 4], [2, 3], [1, 2]])
    });
});