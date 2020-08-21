import _, { ICollection } from '.';
import { assert } from 'chai';

describe('Index', function () {  
    it('should wrap native array', () => {
        const expected = _([1, 2, 3]);

        const result = _([1, 2, 3]);

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

    it('should take and skip combine', () => {
        const expected = [5, 6, 7, 8];

        const result = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .skip(2).take(8).skip(2).take(4).toArray();

        assert.deepEqual(expected, result);
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
});