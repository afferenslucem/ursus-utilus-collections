import _ from '../../src/index'
import { assert } from 'chai';

describe('DictionaryAggregator', function () {
    it('should maps empty', () => {
        const cats = [];

        const result = _(cats).toDictionary(item => item.age).entries()

        assert.deepEqual(result, [
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

        const result = _(cats).toDictionary(item => item.age).entries()

        assert.deepEqual(result, [
            [1,
                {
                    name: 'Lulya',
                    age: 1
                }
            ],
            [4,
                {
                    name: 'Cherry',
                    age: 4
                }
            ],
            [9,
                {
                    name: 'Barsik',
                    age: 9
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

        const result = _(cats).toDictionary(item => item.age, item => item.name).entries()

        assert.deepEqual(result, [
            [1, 'Lulya'],
            [4, 'Cherry'],
            [9, 'Barsik'],
        ])
    });
});