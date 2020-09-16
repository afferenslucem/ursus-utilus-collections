import _, { IEqualityComparer } from '../../src/index'
import { assert } from "chai";
import { GroupJoinCollection, Sequence } from '../../src/sequence';

describe('GroupJoinCollection', function () {  
    it('should create', () => {
        const result = new GroupJoinCollection(new Sequence([1, 2, 3]), new Sequence([2, 3, 4]), item => item, item => item, undefined, (a, b) => 2);
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
            undefined,
            (age, cats) => ({age: age.name, cats: cats.select(cat => cat.name)})).toArray();

        assert.deepEqual(result, expected);
    })

    it('should join by ec', () => {
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
        }]

        const expected = [
            {age: 'Young', cats: _(['Lulya'])},
            {age: 'Middle', cats: _(['Cherry', 'Feya'])},
            {age: 'Old', cats: _(['Barsik'])},
        ]

        const result = new GroupJoinCollection(
            new Sequence(ages),
            new Sequence(cats),
            age => age.age,
            cat => cat.age,
            {
                equal: (a, b) => a.years === b.years,
                getHashCode: a => a.years
            },
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
            undefined,
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
            undefined,
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

    it('should join with equality comparer', () => {
        const personsWithCats = [
            {
                name: 'John',
                cat: {
                    name: 'Barsik'
                }
            },
            {
                name: 'Peter',
                cat: {
                    name: 'Cherry'
                }
            },
            {
                name: 'Leo',
                cat: {
                    name: 'Feya'
                }
            },
        ]

        const clinicWithCats = [{
            name: 'ZooHealth',
            cat: {
                name: 'Barsik'
            }
        },{
            name: 'Panaceya',
            cat: {
                name: 'Feya'
            }
        },{
            name: 'Cat\'s Paradise',
            cat: {
                name: 'Cherry'
            }
        },{
            name: 'Doctor Cat',
            cat: {
                name: 'Feya'
            }
        },];

        const expected = [
            {person: 'John',  clinics: ['ZooHealth']},
            {person: 'Peter', clinics: ['Cat\'s Paradise']},
            {person: 'Leo',   clinics: ['Panaceya', 'Doctor Cat']},
        ]

        const catComparer: IEqualityComparer<{
            name: 'Feya'
        }> = {
            equal(a, b) {
                return a.name == b.name
            },
            getHashCode(a) {
                return a.name
            }
        }

        const result = _(personsWithCats).groupJoin(
            clinicWithCats, 
            person => person.cat, 
            clinic => clinic.cat,
            catComparer,
            (person, clinics) => ({person: person.name, clinics: clinics.select(item => item.name).toArray()})
        ).toArray();

        assert.deepEqual(result, expected);
    })
});