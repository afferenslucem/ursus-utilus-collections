import _ from '../../src/index'
import { assert } from "chai";
import { ExceptCollection, Sequence } from '../../src/sequence';

describe('ExceptCollection', function () {
    it('should create without comparer', () => {
        const result = new ExceptCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]));
    });

    it('should create with comparer', () => {
        const result = new ExceptCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]), (a, b) => a == b);
    });

    it('should return only in first', () => {
        const result = new ExceptCollection(new Sequence([1, 2, 3]), new Sequence([2, 2, 3, 4, 5])).toArray();

        const expected = [1];

        assert.deepEqual(result, expected)
    });

    it('should return empty', () => {
        const result = new ExceptCollection(new Sequence([0, 1, 2, 3]), new Sequence([0, 1, 2, 3])).toArray();

        const expected = [];

        assert.deepEqual(result, expected)
    });

    it('should except cats', () => {
        const cats = [{
            name: 'Tom',
            age: 1
        },
        {
            name: 'Bonny',
            age: 3
        },
        {
            name: 'Lulya',
            age: 2
        }]
        const cats2 = [{
            name: 'Bonny',
            age: 3
        },
        {
            name: 'Lulya',
            age: 2
        }]

        const result = _(cats).except(cats2, (a, b) => a.name === b.name && a.age === b.age).toArray();

        const expected = [{
            name: 'Tom',
            age: 1
        },]

        assert.deepEqual(result, expected)
    })

    it('should intersect', () => {
        const result = _([1, 2, 3, 4, 5]).except([3, 4, 5, 4]).toArray();

        const expected = [1, 2]

        assert.deepEqual(result, expected)
    })
});