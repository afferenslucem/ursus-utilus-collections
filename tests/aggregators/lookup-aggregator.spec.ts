import _ from '../../src/index'
import { assert } from 'chai';

describe('LookupAggregator', function () {
    it('should lookup empty', () => {
        const cats = [];

        const result = Array.from(_(cats).toLookup(item => item.age));

        assert.deepEqual(result, [])
    });


    it('should lookup cats by age', () => {
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

        const result = Array.from(_(cats).toLookup(item => item.age));

        assert.deepEqual(result, [
            [1,
                [{
                    name: 'Lulya',
                    age: 1
                }]
            ],
            [4,
                [{
                    name: 'Cherry',
                    age: 4
                }, {
                    name: 'Feya',
                    age: 4
                }]
            ],
            [9,
                [{
                    name: 'Barsik',
                    age: 9
                }]
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

        const result = Array.from(_(cats).toLookup(item => item.age, item => item.name));

        assert.deepEqual(result, [
            [1, ['Lulya']],
            [4,
                ['Cherry', 'Feya',]
            ],
            [9,
                ['Barsik',]
            ],
        ])
    });
});