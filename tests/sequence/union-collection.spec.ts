import _ from '../../src/index'
import { assert } from "chai";
import { UnionCollection, Sequence } from '../../src/sequence';

describe('UnionCollection', function () {
    it('should create without comparer', () => {
        const result = new UnionCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]));
    });
    it('should create with comparer', () => {
        const result = new UnionCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]), {
            equal: (a, b) => a == b,
            getHashCode: a => a.toString()
        });
    });

    it('should return concated', () => {
        const result = new UnionCollection(new Sequence([1, 2, 3]), new Sequence([4, 5])).toArray();

        const expected = [1, 2, 3, 4, 5];

        assert.deepEqual(result, expected)
    });

    it('should return union', () => {
        const result = new UnionCollection(new Sequence([0, 1, 2, 3]), new Sequence([2, 3, 4, 4, 5, 6])).toArray();

        const expected = [0, 1, 2, 3, 4, 5, 6];

        assert.deepEqual(result, expected)
    });

    it('should return union by age', () => {
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
            name: 'Feya',
            age: 3
        },
        {
            name: 'Cherry',
            age: 2
        }]

        const result = _(cats).union(cats2, {
            equal: (a, b) => a.age == b.age,
            getHashCode: a => a.age
        }).toArray();

        const expected = [{
            name: 'Tom',
            age: 1
        },
        {
            name: 'Lulya',
            age: 2
        },
        {
            name: 'Bonny',
            age: 3
        },]

        assert.deepEqual(result, expected)
    });
    

    it('should return union for collection', () => {
        const result = _([0, 1, 2, 3]).union(new Sequence([2, 3, 4, 4, 5, 6])).toArray();

        const expected = [0, 1, 2, 3, 4, 5, 6];

        assert.deepEqual(result, expected)
    });
    

    it('should return union for array', () => {
        const result = _([0, 1, 2, 3]).union([2, 3, 4, 4, 5, 6]).toArray();

        const expected = [0, 1, 2, 3, 4, 5, 6];

        assert.deepEqual(result, expected)
    });
});