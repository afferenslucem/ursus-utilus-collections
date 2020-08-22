import { Collection, GroupingCollection } from "../collection";
import _ from '../../index'
import { assert } from "chai";
import { IGroupedData } from "../../interfaces/i-grouped-data";

describe('GroupingCollection', function () {
    it('should create', () => {
        const result = new GroupingCollection(new Collection([1, 2, 3]), item => item.toString());
    });

    it('should group', () => {
        const result = new GroupingCollection(new Collection([[1, 2], [2, 3], [2, 4], [3, 4]]), item => item[0]).toArray();

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
        const result = new GroupingCollection(new Collection([[1, 2], [2, 3], [2, 4], [3, 4]]), item => item[0], item => item.first()).toArray();

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
        const result = new GroupingCollection(new Collection([]), item => item[0], item => item.first()).toArray();

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
});