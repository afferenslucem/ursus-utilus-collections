import _ from '../../src/index'
import { assert } from "chai";
import { GroupingCollection, Sequence } from '../../src/sequence';
import { IGroupedData } from '../../src/interfaces/i-grouped-data';
import { isEmpty } from 'lodash';

describe('GroupingCollection', function () {
    it('should create', () => {
        const result = new GroupingCollection(new Sequence([1, 2, 3]), item => item.toString());
    });

    it('should group', () => {
        const result = new GroupingCollection(new Sequence([[1, 2], [2, 3], [2, 4], [3, 4]]), item => item[0]).toArray();

        const expected = [{
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
        }];

        assert.deepEqual(result, expected)
    });

    it('should group and aggregate', () => {
        const result = new GroupingCollection(new Sequence([[1, 2], [2, 3], [2, 4], [3, 4]]), item => item[0], undefined, item => item.first()).toArray();

        const expected = [{
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
        }];

        assert.deepEqual(result, expected)
    });

    it('should group empty', () => {
        const result = new GroupingCollection(new Sequence([]), item => item[0], undefined, item => item.first()).toArray();

        const expected: IGroupedData<number, number>[] = [];

        assert.deepEqual(result, expected)
    });

    it('should group in chaining', () => {
        const result = _([[1, 2], [2, 3], [2, 4], [3, 4]]).groupBy(item => item[0]);

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

        assert.deepEqual(result, expected)
    });

    it('should group and aggregate in chaining', () => {
        const result = _([[1, 2], [2, 3], [2, 4], [3, 4]]).groupBy(item => item[0], group => group.first()).toArray();

        const expected = [{
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
        }];

        assert.deepEqual(result, expected)
    });

    it('should group empty in chaining', () => {
        const result = _([]).groupBy(item => item[0], item => item.first()).toArray();

        const expected: IGroupedData<number, number>[] = [];

        assert.deepEqual(result, expected)
    });

    it('should group cats by name and tage age', () => {
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
        },
        {
            name: 'Bonny',
            age: 2
        },
        {
            name: 'Cherry',
            age: 2
        }]

        const result = _(cats).groupBy(item => item, {
            equal: (a, b) => a.name == b.name,
            getHashCode: a => a.name
        }, group => group.select(item => item.age).toArray()).toArray();

        const expected = [
            {
                key: {
                    name: 'Tom',
                    age: 1
                },
                group: [1]
            },
            {
                key: {
                    name: 'Bonny',
                    age: 3
                },
                group: [3, 2]
            },
            {
                key: {
                    name: 'Lulya',
                    age: 2
                },
                group: [2]
            },
            {
                key: {
                    name: 'Cherry',
                    age: 2
                },
                group: [2]
            },
        ]

        assert.deepEqual(result, expected)
    });
});