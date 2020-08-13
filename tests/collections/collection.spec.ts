import { assert } from 'chai';
import {Collection} from '../../src/collections/collection';

describe('Collection', function () {  
    it('should filter items by predicate', () => {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const expected = [6, 12];

        const collection = new Collection(items);

        const filterCollection = collection
        .where(item => item % 2 == 0)
        .where(item => item % 3 == 0);

        const result = filterCollection.toArray();
        const result2 = filterCollection.toArray();

        assert.deepEqual(result, expected);
        assert.equal(result, result2);
    });  

    it('should map items by predicate', () => {
        const items = [1, 2, 3];

        const expected = [3, 6, 11];

        const collection = new Collection(items);

        const result = collection
        .select(item => item ** 2)
        .select(item => item + 2)
        .toArray();

        assert.deepEqual(result, expected);
    });  

    it('should map items to other tyde with correct chaining', () => {
        const items = [1, 2, 3];

        const expected = ['4'];

        const collection = new Collection(items)

        const result = collection.select(item => (item ** 2).toString())
        .where(item => item.startsWith('4'))
        .toArray();

        assert.deepEqual(result, expected);
    }); 

    it('should create materialized collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)
        assert.isTrue(collection.materialized, 'Is not materialized');
    }); 

    it('should reverse array', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)

        const result = collection.reverse().toArray();

        assert.deepEqual(result, [3, 2, 1], 'Didn\'t reverce');
        assert.deepEqual(items, [1, 2, 3], 'Changed array');
    });  

    it('should sort array', () => {
        const items = [3, 2, 1];
        const collection = new Collection(items)

        const result = collection.reverse().toArray();

        assert.deepEqual(items, [3, 2, 1], 'Changed array');
        assert.deepEqual(result, [1, 2, 3], 'Didn\'t sort');
    });  
});