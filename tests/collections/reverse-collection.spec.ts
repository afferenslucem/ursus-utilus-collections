import _ from '../../src/index'
import { assert } from "chai";
import { ReverseCollection, Sequence } from '../../src/collection';

describe('ReverseCollection', function () {  
    it('should create', () => {
        const result = new ReverseCollection(new Sequence([1, 2, 3]));
    });

    it('should reverse', () => {
        const items = [1, 2, 3];
        const collection = new ReverseCollection(new Sequence(items))

        const result = collection.toArray();

        assert.deepEqual(result, [3, 2, 1], 'Didn\'t reverce');
        assert.deepEqual(items, [1, 2, 3], 'Changed array');
    });

    it('should reverse from chaining', () => {
        const items = [1, 2, 3];
        const collection = _(items)

        const result = collection.reverse().toArray();

        assert.deepEqual(result, [3, 2, 1], 'Didn\'t reverce');
        assert.deepEqual(items, [1, 2, 3], 'Changed array');
    });
});