
import _ from '../../src/index'
import {Dictionary} from '../../src/collections/distionary'
import { assert } from "chai";
import { DictionaryException } from '../../src/exceptions/dictionary-exceptions';

describe('Dictionary With String Key', function () {  
    let storage: Dictionary<string, number> = null;

    beforeEach(() => {
        storage = new Dictionary<string, number>();
    })

    it('should create', () => {
        const result = new Dictionary<string, number>();
    });

    it('should add', () => {
        const expected = 1;

        storage.add('one', expected);

        const result = storage.get('one');

        assert.equal(expected, result)
    });

    it('should return undefined for unexists key', () => {
        const expected = undefined;

        const result = storage.tryGet('one');

        assert.equal(expected, result)
    });

    it('should throw error for redundand key', () => {
        assert.throws(() => {
            storage.add('one', 1);
            storage.add('one', 1);
        }, DictionaryException.KeyAlreadyExists)
    });

    it('should return entries', () => {
        storage.add('one', 1);
        storage.add('two', 2);

        const expected = [['one', 1], ['two', 2]]

        const result = storage.entries();

        assert.deepEqual(result, expected);
    });

    it('should add and addOrUpdate', () => {
        const expected = 2;

        storage.add('one', 1);
        storage.addOrUpdate('one', expected);

        const result = storage.get('one');

        assert.equal(expected, result)
    });

    it('should update', () => {
        const expected = 2;

        storage.add('one', 1);
        storage.update('one', expected);

        const result = storage.get('one');

        assert.equal(expected, result)
    });

    it('should throw exception for non exist key on update', () => {
        assert.throws(() => {
            storage.update('one', 1);
        }, DictionaryException.KeyDoesNotExists)
    });

    it('should remove', () => {
        storage.add('one', 1);
        const result = storage.get('one');
        assert.equal(result, 1)

        storage.remove('one');

        assert.throws(() => {
            storage.get('one');
        }, DictionaryException.KeyDoesNotExists)
    });

    it('should throw exception for non exist key on remove', () => {
        assert.throws(() => {
            storage.remove('one');
        }, DictionaryException.KeyDoesNotExists)
    });
});

describe('Dictionary With Number Key', function () {  
    let storage: Dictionary<number, string> = null;

    beforeEach(() => {
        storage = new Dictionary<number, string>();
    })

    it('should create', () => {
        const result = new Dictionary<number, string>();
    });

    it('should add', () => {
        const expected = 'one';

        storage.add(1, expected);

        const result = storage.get(1);

        assert.equal(expected, result)
    });

    it('should add and addOrUpdate', () => {
        const expected = 'two';

        storage.add(2, 'one');
        storage.addOrUpdate(2, expected);

        const result = storage.get(2);

        assert.equal(expected, result)
    });

    it('should update', () => {
        const expected = 'two';

        storage.add(1, 'one');
        storage.update(1, expected);

        const result = storage.get(1);

        assert.equal(expected, result)
    });

    it('should remove', () => {
        storage.add(1, 'one');
        const result = storage.get(1);
        assert.equal(result, 'one')

        storage.remove(1);

        assert.throws(() => {
            storage.get(1);
        }, DictionaryException.KeyDoesNotExists)
    });
});

interface Cat {
    name: string;
    age: number;
};

describe('Dictionary With Object Key and custom comparer', function () {  

    let storage: Dictionary<Cat, string> = null;

    beforeEach(() => {
        storage = new Dictionary<Cat, string>({
            equal: (a: Cat, b: Cat) => a.name === b.name && a.age === b.age,
            getHashCode: (a: Cat) => a.name
        });
    })

    const cats = [{
        name: 'Barsik',
        age: 9
    },{
        name: 'Barsik',
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

    it('should create', () => {
        const result = new Dictionary<Cat, string>({
            equal: (a: Cat, b: Cat) => a.name === b.name && a.age === b.age,
            getHashCode: (a: Cat) => a.name
        });
    });

    it('should add', () => {
        const expected = 'one';

        storage.add(cats[0], expected);

        const result = storage.get(cats[0]);

        assert.equal(expected, result)
    });

    it('should add whith same code', () => {
        const expected1 = 'one';
        const expected2 = 'two';

        storage.add(cats[0], expected1);
        storage.add(cats[1], expected2);

        const result1 = storage.get(cats[0]);
        assert.equal(expected1, result1)

        const result2 = storage.get(cats[1]);
        assert.equal(expected2, result2)
    });

    it('should return entries', () => {
        const expected1 = 'one';
        const expected2 = 'two';

        storage.add(cats[0], expected1);
        storage.add(cats[1], expected2);
        storage.add(cats[2], expected2);

        const expected = [
            [cats[0], expected1],
            [cats[1], expected2],
            [cats[2], expected2],
        ]

        const result = storage.entries();
        assert.deepEqual(expected, result)
    });

    it('should update whith same code', () => {
        const expected1 = 'one';
        const expected2 = 'two';
        const expected3 = 'three';

        storage.add(cats[0], expected1);
        storage.add(cats[1], expected2);
        storage.update(cats[1], expected3);

        const result1 = storage.get(cats[0]);
        assert.equal(expected1, result1)

        const result2 = storage.get(cats[1]);
        assert.equal(expected3, result2)
    });

    it('should remove whith same code', () => {
        const expected1 = 'one';
        const expected2 = 'two';

        storage.add(cats[0], expected1);
        storage.add(cats[1], expected2);
        storage.remove(cats[1]);

        const result1 = storage.get(cats[0]);
        assert.equal(expected1, result1)

        assert.throws(() => {
            const result2 = storage.get(cats[1]);
            console.log(result2)
        }, DictionaryException.KeyDoesNotExists)
    });

    it('should throws for remove remove whith same code', () => {
        const expected1 = 'one';

        storage.add(cats[0], expected1);

        assert.throws(() => {
            storage.remove(cats[1]);
        }, DictionaryException.KeyDoesNotExists)
    });
});