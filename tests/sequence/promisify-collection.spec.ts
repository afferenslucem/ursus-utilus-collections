import { assert } from "chai";
import {Sequence, PromisifyCollection} from '../../src/sequence';

describe('PromisifyCollection', function () {
    it('should create', () => {
        const result = new PromisifyCollection(new Sequence([1, 2, 3]));
    });

    describe('toArray', () => {
        it('should to array', async () => {
            const collection = new Sequence([1, 2, 3]);

            const result = await collection.promisify().toArray();

            assert.deepEqual(result, [1, 2, 3]);
        });
    })

    interface Cat {
        name: string;
        age: number;
    }

    describe('toDictionary', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'barsik',
            age: 12
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Cherry',
            age: 6
        },{
            name: 'Feya',
            age: 4
        },];

        const comparer = {
            equal: (a: string, b: string) => a.toLowerCase() == b.toLowerCase(),
            getHashCode: (a: string) => a.toLowerCase()
        };

        it('should to dictionary', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toDictionary(item => item.name);

            assert.deepEqual(result.entries(), [
                ['Barsik', { name: 'Barsik', age: 9 }],
                ['barsik', { name: 'barsik', age: 12 }],
                ['Cherry', { name: 'Cherry', age: 4 }],
                ['Feya', { name: 'Feya', age: 4 }],
            ]);
        });

        it('should to dictionary with comparer', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toDictionary(item => item.name, comparer);

            assert.deepEqual(result.entries(), [
                ['Barsik', { name: 'Barsik', age: 9 }],
                ['Cherry', { name: 'Cherry', age: 4 }],
                ['Feya', { name: 'Feya', age: 4 }],
            ]);
        });

        it('should to dictionary with element selector', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toDictionary(item => item.name, item => item.age);

            assert.deepEqual(result.entries(), [
                ['Barsik', 9],
                ['barsik', 12],
                ['Cherry', 4],
                ['Feya', 4],
            ]);
        });

        it('should to dictionary with element selector and comparer', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toDictionary(item => item.name, comparer, item => item.age);

            assert.deepEqual(result.entries(), [
                ['Barsik', 9],
                ['Cherry', 4],
                ['Feya', 4],
            ]);
        });
    })

    describe('toHashset', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'barsik',
            age: 12
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Cherry',
            age: 6
        },{
            name: 'Feya',
            age: 4
        },];

        const comparer = {
            equal: (a: Cat, b: Cat) => a.name.toLowerCase() == b.name.toLowerCase(),
            getHashCode: (a: Cat) => a.name.toLowerCase()
        };

        it('should to hashset', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toHashSet();

            assert.deepEqual(result.entries(), [
                { name: 'Barsik', age: 9 },
                { name: 'barsik', age: 12 },
                { name: 'Cherry', age: 4 },
                { name: 'Cherry', age: 6 },
                { name: 'Feya', age: 4 },
            ]);
        });

        it('should to hashset with comparer', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toHashSet(comparer);

            assert.deepEqual(result.entries(), [
                { name: 'Barsik', age: 9 },
                { name: 'Cherry', age: 4 },
                { name: 'Feya', age: 4 },
            ]);
        });
    })

    describe('toLookup', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'barsik',
            age: 12
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Cherry',
            age: 6
        },{
            name: 'Feya',
            age: 4
        },];

        const comparer = {
            equal: (a: string, b: string) => a.toLowerCase() == b.toLowerCase(),
            getHashCode: (a: string) => a.toLowerCase()
        };

        it('should to lookup', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toLookup(item => item.name);

            assert.deepEqual(result.entries(), [
                ['Barsik', [{ name: 'Barsik', age: 9 }]],
                ['barsik', [{ name: 'barsik', age: 12 }]],
                ['Cherry', [{ name: 'Cherry', age: 4 }, { name: 'Cherry', age: 6 }]],
                ['Feya', [{ name: 'Feya', age: 4 }]],
            ]);
        });

        it('should to lookup with comparer', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toLookup(item => item.name, comparer);

            assert.deepEqual(result.entries(), [
                ['Barsik', [{ name: 'Barsik', age: 9 }, { name: 'barsik', age: 12 }]],
                ['Cherry', [{ name: 'Cherry', age: 4 }, { name: 'Cherry', age: 6 }]],
                ['Feya', [{ name: 'Feya', age: 4 }]],
            ]);
        });

        it('should to dictionary with element selector', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toLookup(item => item.name, item => item.age);

            assert.deepEqual(result.entries(), [
                ['Barsik', [9]],
                ['barsik', [12]],
                ['Cherry', [4, 6]],
                ['Feya', [4]],
            ]);
        });

        it('should to dictionary with element selector and comparer', async () => {
            const collection = new Sequence(cats);

            const result = await collection.promisify().toLookup(item => item.name, comparer, item => item.age);

            assert.deepEqual(result.entries(), [
                ['Barsik', [9, 12]],
                ['Cherry', [4, 6]],
                ['Feya', [4]],
            ]);
        });
    })
});
