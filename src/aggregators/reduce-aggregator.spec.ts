import { assert } from "chai";
import _ from '../index'
import { SumAggregator } from "./sum-aggregator";
import { ReduceAggregator } from "./reduce-aggregator";

describe('ReduceAggregator', function () {
    it('should return 1 for array [1]', () => {
        const collection = _([1]);

        const expected = 1;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate();

        assert.equal(result, expected)
    });

    it('should return 1 for array [1] with acc', () => {
        const collection = _([1]);

        const expected = 11;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate(10);

        assert.equal(result, expected)
    });

    it('aggregator should returns sum of range', () => {
        const collection = _.range(1, 9);

        const expected = 45;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate();

        assert.equal(result, expected)
    });

    it('aggregator should returns sum of range', () => {
        const collection = _.range(1, 150_000);

        const expected = 11250075000;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate();

        assert.equal(result, expected)
    });

    it('aggregator should returns sum of range with acc', () => {
        const collection = _.range(1, 150_000);

        const expected = 11250075001;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate(1);

        assert.equal(result, expected)
    });

    it('aggregator should returns sum of range with acc', () => {
        const collection = _.range(1, 9);

        const expected = 55;

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate(10);

        assert.equal(result, expected)
    });
    
    it('aggregator should returns sum of strings', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = 'abc';

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate();

        assert.equal(result, expected)
    });
    
    it('aggregator should returns sum of strings with acc', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = '_abc';

        const result = new ReduceAggregator(collection, (a, b) => a + b).aggregate('_');

        assert.equal(result, expected)
    });

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
    
    it('should returns sum of strings', () => {
        const collection = _(['a', 'b', 'c',]);

        const expected = 'abc';

        const result = collection.sum();

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

    it('should returns aggregated object for 150k array', () => {
        const collection = _.range(1, 150_000);

        const expected = collection.toArray().reduce((a, b) => {
            a[b] = b;
            return a;
        }, {});

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