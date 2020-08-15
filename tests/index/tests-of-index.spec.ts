import _, { ICollection } from '../../src';
import { assert } from 'chai';
import { IGroupedData } from '../../src/interfaces/i-grouped-data';
import { cats } from '../collections/cats.spec';

describe('Index', function () {  
    it('should wrap native array', () => {
        const expected = _([1, 2, 3]);

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

    it('should correct cascade', () => {
        const expected = ['25', '9'];

        const result = _([1, 2, 3, 4, 5, 6, 7, 8])
        .where(item => !!(item % 2)) // [1, 3, 5, 7]
        .select(item => (item ** 2).toString()) // ['1', '9', '25', '49']
        .skip(1) // ['9', '25', '49']
        .take(2) // ['9', '25']
        .sort() // ['25', '9']
        .toArray();

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

    it('should group', () => {
        const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

        const expected = _([{
            key: 1,
            group: _([[1, 2]])
        },
        {
            key: 2,
            group: _([[2, 3], [2, 4]])
        },
        {
            key: 3,
            group: _([[3, 4]])
        }]);

        const grouped = collection.groupBy(item => item[0]);

        assert.deepEqual(grouped, expected)
    });

    it('should group and aggregate', () => {
        const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

        const expected: ICollection<IGroupedData<number, number[]>> = _([{
            key: 1,
            group: [1, 2]
        },
        {
            key: 2,
            group: [2, 3]
        },
        {
            key: 3,
            group: [3, 4]
        }]);

        const grouped = collection.groupBy(item => item[0], group => group.first());

        assert.deepEqual(grouped, expected)
    });

    it('should generate range', () => {
        const collection = _.range(0, 5);

        const expected = _([0, 1, 2, 3, 4, 5]);

        assert.deepEqual(collection, expected)
    });

    it('should find min', () => {
        const collection = _([4, 3, 6, 9, 7, 1, 8]);

        const expected = 1;

        const result = collection.min();

        assert.deepEqual(result, expected)
    });

    it('should find max', () => {
        const collection = _([4, 3, 6, 9, 7, 1, 8]);

        const expected = 9;

        const result = collection.max();

        assert.deepEqual(result, expected)
    });

    it('should find cat with min age', () => {
        const collection = _(cats);

        const expected = cats[1];

        const result = collection.min((first, second) => first.age - second.age);

        assert.deepEqual(result, expected)
    });

    it('should find max', () => {
        const collection = _(cats);

        const expected = cats[4];

        const result = collection.max((first, second) => first.age - second.age);

        assert.deepEqual(result, expected)
    });

    it('should generate range', () => {
        const collection = _.range(0, 5);

        const expected = _([0, 1, 2, 3, 4, 5]);

        assert.deepEqual(collection, expected)
    });

    it('should generate range with step', () => {
        const collection = _.range(0, 6, 2);

        const expected = _([0, 2, 4, 6]);

        assert.deepEqual(collection, expected)
    });

    it('should check existings', () => {
        const collection = _.range(1, 9);

        const expected = true;

        const result = collection.exists(item => (item % 7) == 0);

        assert.equal(result, expected)
    });

    it('should return sum', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = collection.sum();

        assert.equal(result, expected)
    });
    
    it('should return sum', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = 'abc';

        const result = collection.sum();

        assert.equal(result, expected)
    });
    
    it('should return sum', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        const result = collection.sum((a, b) => Number(a) + Number(b));

        assert.equal(result, expected)
    });
    
    it('should reverse', () => {
        const collection = _([1, 2, 3]);

        const expected = [3, 2, 1];

        const result = collection.reverse().toArray();

        assert.deepEqual(result, expected)
    });
    
    it('should return distinct', () => {
        const collection = _([1, 1, 2, 1, 3, 2, 3]);

        const expected = [1, 2, 3];

        const result = collection.distinct().toArray();

        assert.deepEqual(result, expected)
    });
    
    it('should return distinctBy', () => {
        const collection = _([[1, 1], [2, 1], [3, 2]]);

        const expected = [[1, 1], [3, 2]];

        const result = collection.distinct(item => item[1]).toArray();

        assert.deepEqual(result, expected)
    });
});