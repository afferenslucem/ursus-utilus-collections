import { Collection, MappingCollection, MappingManyCollection } from "../../collection";
import _ from '../../../index'
import { assert } from "chai";

describe('MappingManyCollection', function () {  
    it('should create', () => {
        const result = new MappingManyCollection(new Collection([1, 2, 3]), item => [item]);
    });

    it('should return mapped from toArray()', () => {
        const result = new MappingManyCollection(new Collection([8, 5, 4, 2, 9, 1, 4]), item => [item + 1]).toArray();
        const expected = [9, 6, 5, 3, 10, 2, 5];

        assert.deepEqual(result, expected);
    });

    it('should return double mapped from toArray()', () => {
        const result = new MappingManyCollection(new Collection([[8], [5], [4], [2], [9], [1], [4]]), item => [item]).selectMany(item => item.map(a => (Number(a) + 1) / 2)).toArray();
        const expected = [4.5, 3, 2.5, 1.5, 5, 1, 2.5];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection', () => {
        const result = new MappingManyCollection(new Collection([]), item => [item + 1]).select(item => item).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });

    it('should return mapped', () => {
        const result = _([[8, 5], [4, 2], [9, 1], [4]]).selectMany(item => item).toArray();
        const expected = [8, 5, 4, 2, 9, 1, 4];

        assert.deepEqual(result, expected);
    });

    it('should return mapped', () => {
        const cats = [
            {
                name: 'Feya',
                kittens: ['Lory', 'Pussy']
            },
            {
                name: 'Cherry',
                kittens: ['Browny', 'Tommy']
            }
        ]
        const result = _(cats).selectMany(item => item.kittens).toArray();
        const expected = ['Lory', 'Pussy', 'Browny', 'Tommy'];

        assert.deepEqual(result, expected);
    });
});