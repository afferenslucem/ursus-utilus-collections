import _ from '../../src/index'
import { assert } from "chai";
import { JoinCollection, Sequence } from '../../src/sequence';

describe('JoinCollection', function () {  
    it('should create', () => {
        const result = new JoinCollection(new Sequence([1, 2, 3]), new Sequence([2, 3, 4]), item => item, item => item, undefined, (a, b) => a + b);
    });

    it('should merge', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },{
            name: 'Lulya',
            age: 1
        },];

        const ages = [{
            years: 1,
            name: "Young"
        },{
            years: 4,
            name: "Middle"
        },{
            years: 9,
            name: "Old"
        },{
            years: 1,
            name: "Baby"
        },]

        const expected = [
            {name: 'Barsik', age: 'Old'},
            {name: 'Cherry', age: 'Middle'},
            {name: 'Feya', age: 'Middle'},
            {name: 'Lulya', age: 'Young'},
            {name: 'Lulya', age: 'Baby'},
        ]

        const result = new JoinCollection(
            new Sequence(cats),
            new Sequence(ages),
            item => item.age,
            item => item.years,
            undefined,
            (cat, age) => ({name: cat.name, age: age.name})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should merge by ec', () => {
        const cats = [{
            name: 'Barsik',
            age: {
                years: 9
            }
        },{
            name: 'Cherry',
            age: {
                years: 4
            }
        },{
            name: 'Feya',
            age: {
                years: 4
            }
        },{
            name: 'Lulya',
            age: {
                years: 1
            }
        },];

        const ages = [{
            age: {
                years: 1
            },
            name: "Young"
        },{
            age: {
                years: 4
            },
            name: "Middle"
        },{
            age: {
                years: 9
            },
            name: "Old"
        },{
            age: {
                years: 1
            },
            name: "Baby"
        }]

        const expected = [
            {name: 'Barsik', age: 'Old'},
            {name: 'Cherry', age: 'Middle'},
            {name: 'Feya', age: 'Middle'},
            {name: 'Lulya', age: 'Young'},
            {name: 'Lulya', age: 'Baby'},
        ]

        const result = new JoinCollection(
            new Sequence(cats),
            new Sequence(ages),
            item => item.age,
            item => item.age,
            {
                equal: (a, b) => a.years === b.years,
                getHashCode: a => a.years
            },
            (cat, age) => ({name: cat.name, age: age.name})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should merge with empty', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },{
            name: 'Lulya',
            age: 1
        },];

        const ages = []

        const expected = [];

        const result = new JoinCollection(
            new Sequence(cats),
            new Sequence(ages),
            item => item.age,
            item => item.years,
            undefined,
            (cat, age) => ({name: cat.name, age: age.name})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should merge with empty', () => {
        const cats = [];

        const ages = [{
            years: 1,
            name: "Young"
        },{
            years: 4,
            name: "Middle"
        },{
            years: 9,
            name: "Old"
        },{
            years: 1,
            name: "Baby"
        },]

        const expected = []

        const result = new JoinCollection(
            new Sequence(cats),
            new Sequence(ages),
            item => item.age,
            item => item.years,
            undefined,
            (cat, age) => ({name: cat.name, age: age.name})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should merge by func', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },{
            name: 'Lulya',
            age: 1
        },];

        const ages = [{
            years: 1,
            name: "Young"
        },{
            years: 4,
            name: "Middle"
        },{
            years: 9,
            name: "Old"
        }]

        const expected = [
            {name: 'Barsik', age: 'Old'},
            {name: 'Cherry', age: 'Middle'},
            {name: 'Feya', age: 'Middle'},
            {name: 'Lulya', age: 'Young'},
        ]

        const result = _(cats).join(
            ages, 
            cat => cat.age, 
            age => age.years,
            (cat, age) => ({name: cat.name, age: age.name})
        ).toArray();

        assert.deepEqual(result, expected);
    })

    it('should merge by func with ec', () => {
        const cats = [{
            name: 'Barsik',
            age: {
                years: 9
            }
        },{
            name: 'Cherry',
            age: {
                years: 4
            }
        },{
            name: 'Feya',
            age: {
                years: 4
            }
        },{
            name: 'Lulya',
            age: {
                years: 1
            }
        },];

        const ages = [{
            age: {
                years: 1
            },
            name: "Young"
        },{
            age: {
                years: 4
            },
            name: "Middle"
        },{
            age: {
                years: 9
            },
            name: "Old"
        },{
            age: {
                years: 1
            },
            name: "Baby"
        }]

        const expected = [
            {name: 'Barsik', age: 'Old'},
            {name: 'Cherry', age: 'Middle'},
            {name: 'Feya', age: 'Middle'},
            {name: 'Lulya', age: 'Young'},
            {name: 'Lulya', age: 'Baby'},
        ]

        const result = _(cats).join(
            ages, 
            cat => cat.age, 
            age => age.age,
            {
                equal: (a, b) => a.years === b.years,
                getHashCode: a => a.years
            },
            (cat, age) => ({name: cat.name, age: age.name})
        ).toArray();

        assert.deepEqual(result, expected);
    })
});