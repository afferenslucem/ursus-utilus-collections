import _ from '../../src/index'
import { assert } from "chai";
import { IntersectCollection, Sequence } from '../../src/sequence';

describe('IntersectCollection', function () {
    it('should create without comparer', () => {
        const result = new IntersectCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]));
    });

    it('should create with comparer', () => {
        const result = new IntersectCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]), {
            equal: (a, b) => a === b,
            getHashCode: a => a
        });
    });

    it('should return intersected', () => {
        const result = new IntersectCollection(new Sequence([1, 2, 3]), new Sequence([2, 2, 3, 4, 5])).toArray();

        const expected = [2, 3];

        assert.deepEqual(result, expected)
    });

    it('should return empty', () => {
        const result = new IntersectCollection(new Sequence([0, 1, 2, 3]), new Sequence([4, 4, 5, 6])).toArray();

        const expected = [];

        assert.deepEqual(result, expected)
    });

    it('should intersect cats', () => {
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
            name: 'Cherry',
            age: 2
        }]

        const result = _(cats).intersect(cats2, {
            equal: (a, b) => a.age === b.age && a.name === b.name,
            getHashCode: a => a.name
        }).toArray();

        const expected = [{
            name: 'Bonny',
            age: 3
        },]

        assert.deepEqual(result, expected)
    })

    it('should intersect', () => {
        const result = _([1, 2, 3, 4]).intersect([3, 4, 5, 4]).toArray();

        const expected = [3, 4]

        assert.deepEqual(result, expected)
    })
});