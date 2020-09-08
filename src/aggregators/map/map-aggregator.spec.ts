import _ from '../../index'
import { MapAggregator } from './map-aggregator'
import { assert } from 'chai';

describe('MapAggregator', function () {
    it('should create without value selector', () => {
        const collection = _([1]);

        const result = new MapAggregator(collection, item => item);
    });

    it('should create with value selector', () => {
        const collection = _([1]);

        const result = new MapAggregator(collection, item => item, item => item);
    });

    it('should maps cats by age', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        }, {
            name: 'Cherry',
            age: 4
        }, {
            name: 'Feya',
            age: 4
        }, {
            name: 'Lulya',
            age: 1
        },];

        const result = Array.from(new MapAggregator(_(cats), item => item.age).aggregate());

        assert.deepEqual(result, [
            [9, { name: 'Barsik', age: 9 } ],
            [4, { name: 'Cherry', age: 4 } ],
            [1, { name: 'Lulya',  age: 1 } ],
        ])
    });

    it('should lookup cats by age and select name', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        }, {
            name: 'Cherry',
            age: 4
        }, {
            name: 'Feya',
            age: 4
        }, {
            name: 'Lulya',
            age: 1
        },];

        const result = Array.from(new MapAggregator(_(cats), item => item.age, item => item.name).aggregate());

        assert.deepEqual(result, [
            [9, 'Barsik'],
            [4, 'Cherry'],
            [1, 'Lulya'],
        ])
    });

    it('should maps cats by age', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        }, {
            name: 'Cherry',
            age: 4
        }, {
            name: 'Feya',
            age: 4
        }, {
            name: 'Lulya',
            age: 1
        },];

        const result = Array.from(_(cats).toMap(item => item.age))

        assert.deepEqual(result, [
            [9,
                {
                    name: 'Barsik',
                    age: 9
                }
            ],
            [4,
                {
                    name: 'Cherry',
                    age: 4
                }
            ],
            [1,
                {
                    name: 'Lulya',
                    age: 1
                }
            ],
        ])
    });

    it('should lookup cats by age and select name', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        }, {
            name: 'Cherry',
            age: 4
        }, {
            name: 'Feya',
            age: 4
        }, {
            name: 'Lulya',
            age: 1
        },];

        const result = Array.from(_(cats).toMap(item => item.age, item => item.name))

        assert.deepEqual(result, [
            [9, 'Barsik'],
            [4, 'Cherry'],
            [1, 'Lulya'],
        ])
    });
});