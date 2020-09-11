import { assert } from "chai";
import _ from '../../src/index'

describe('ReduceAggregator', function () {
    it('should returns sum of range', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = collection.sum();

        assert.equal(result, expected)
    });

    it('should returns sum by agregate', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = collection.aggregate((a, b) => a + b);

        assert.equal(result, expected)
    });
    
    it('should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = 16;

        // @ts-ignore
        const result = collection.aggregate((a, b) => Number(a) + Number(b), '10');

        // @ts-ignore
        assert.equal(result, expected)
    });
    
    it('should returns aggregated object', () => {
        const collection = _(['1', '2', '3',]);

        const expected = {
            '1': '1',
            '2': '2',
            '3': '3',
        };

        // @ts-ignore
        const result = collection.aggregate((a, b) => {
            a[b] = b;
            return a;
        }, {});

        // @ts-ignore
        assert.deepEqual(result, expected)
    });

    it('should aggregate to object', () => {
        const collection = _([
            { name: 'first', value: 1 },
            { name: 'second', value: 2 },
            { name: 'third', value: 3 },
        ]);

        const expected = {
            'first': 1,
            'second': 2,
            'third': 3
        };

        const result = collection.aggregate((acc, item) => {
            acc[item.name] = item.value
            return acc;
        }, {});

        assert.deepEqual(result, expected)
    });
});