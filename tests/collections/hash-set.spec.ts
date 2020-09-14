
import _ from '../../src/index'
import { assert } from "chai";
import { HashSet } from '../../src/collections/hash-set';

describe('HashSet With String Key', function () {  
    let storage: HashSet<string> = null;

    beforeEach(() => {
        storage = new HashSet<string>();
    })

    it('should create', () => {
        const result = new HashSet<string>();
    });

    it('should add', () => {
        storage.add('one');
        storage.add('one');
        storage.add('one');

        const result = storage.contains('one');

        assert.isTrue(result)

        assert.equal(storage.count, 1)
    });

    it('should contains every only once', () => {
        storage.add('one');
        storage.add('one');
        storage.add('one');
        storage.add('two');
        storage.add('two');
        storage.add('zero');
        storage.add('zero');
        storage.add('zero');

        assert.deepEqual(storage.entries(), ['one', 'two', 'zero'])
        
        assert.equal(storage.count, 3)
    });

    it('should add different', () => {
        storage.add('one');
        storage.add('one');
        storage.add('two');

        const result = storage.contains('two');

        assert.isTrue(result)

        assert.equal(storage.count, 2)

        storage.clear();

        assert.equal(storage.count, 0)
    });

    it('should remove', () => {
        storage.add('one');

        storage.remove('one');

        const result = storage.contains('one');

        assert.isFalse(result);

        assert.equal(storage.entries().length, 0);
    });
});

describe('Dictionary With Number Key', function () {  
    let storage: HashSet<number> = null;

    beforeEach(() => {
        storage = new HashSet<number>();
    })

    it('should create', () => {
        const result = new HashSet<number>();
    });

    it('should add', () => {
        storage.add(1);
        storage.add(1);
        storage.add(1);

        const result = storage.contains(1);

        assert.isTrue(result)

        assert.equal(storage.entries().length, 1)
    });

    it('should add different', () => {
        storage.add(1);
        storage.add(1);
        storage.add(2);

        const result = storage.contains(2);

        assert.isTrue(result)

        assert.equal(storage.entries().length, 2)
    });

    it('should contains every only once', () => {
        storage.add(1);
        storage.add(1);
        storage.add(1);
        storage.add(2);
        storage.add(2);
        storage.add(3);
        storage.add(4);
        storage.add(4);

        assert.deepEqual(storage.entries(), [1, 2, 3, 4])
    });

    it('should remove', () => {
        storage.add(1);

        storage.remove(1);

        const result = storage.contains(1);

        assert.isFalse(result);

        assert.equal(storage.entries().length, 0);
    });
});

interface Cat {
    name: string;
    age: number;
};

describe('Dictionary With Object Key and custom comparer', function () {  

    let storage: HashSet<Cat> = null;

    beforeEach(() => {
        storage = new HashSet<Cat>({
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
        age: 4
    },{
        name: 'Feya',
        age: 4
    },];

    beforeEach(() => {
        storage = new HashSet<Cat>();
    })

    it('should create', () => {
        const result = new HashSet<Cat>();
    });

    it('should add', () => {
        storage.add(cats[0]);
        storage.add(cats[0]);
        storage.add(cats[0]);

        const result = storage.contains(cats[0]);

        assert.isTrue(result)

        assert.equal(storage.entries().length, 1)
    });

    it('should add different', () => {
        storage.add(cats[0]);
        storage.add(cats[0]);
        storage.add(cats[1]);

        const result = storage.contains(cats[1]);

        assert.isTrue(result)

        assert.equal(storage.entries().length, 2)
    });

    it('should contains every only once', () => {
        storage = new HashSet({
            equal: (a, b) => a.name === b.name,
            getHashCode: a => a.name
        })

        storage.add(cats[0]);
        storage.add(cats[1]);
        storage.add(cats[2]);
        storage.add(cats[3]);
        storage.add(cats[4]);

        assert.deepEqual(storage.entries(), [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },])
    });

    it('should remove', () => {
        storage.add(cats[1]);

        storage.remove(cats[1]);

        const result = storage.contains(cats[1]);

        assert.isFalse(result);

        assert.equal(storage.entries().length, 0);
    });
});