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
});