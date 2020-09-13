import _ from '../../src/index'
import { assert } from "chai";
import { GroupJoinCollection, Sequence } from '../../src/sequence';

describe('GroupJoinCollection', function () {  
    it('should create', () => {
        const result = new GroupJoinCollection(new Sequence([1, 2, 3]), new Sequence([2, 3, 4]), item => item, item => item, (a, b) => 2);
    });

    it('should join', () => {
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
            {age: 'Young', cats: _(['Lulya'])},
            {age: 'Middle', cats: _(['Cherry', 'Feya'])},
            {age: 'Old', cats: _(['Barsik'])},
        ]

        const result = new GroupJoinCollection(
            new Sequence(ages),
            new Sequence(cats),
            age => age.years,
            cat => cat.age,
            (age, cats) => ({age: age.name, cats: cats.select(cat => cat.name)})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should join', () => {
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

        const expected = []

        const result = new GroupJoinCollection(
            new Sequence(ages),
            new Sequence(cats),
            age => age.years,
            cat => cat.age,
            (age, cats) => ({age: age.name, cats: cats.select(cat => cat.name)})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should join with empty', () => {
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
        }]

        const expected = []

        const result = new GroupJoinCollection(
            new Sequence(ages),
            new Sequence(cats),
            age => age.years,
            cat => cat.age,
            (age, cats) => ({age: age.name, cats: cats.select(cat => cat.name)})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should join', () => {
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
            {age: 'Young', cats: _(['Lulya'])},
            {age: 'Middle', cats: _(['Cherry', 'Feya'])},
            {age: 'Old', cats: _(['Barsik'])},
        ]

        const result = _(ages).groupJoin(
            cats,
            age => age.years,
            cat => cat.age,
            (age, cats) => ({age: age.name, cats: cats.select(cat => cat.name)})).toArray();

        assert.deepEqual(result, expected);
    })
});