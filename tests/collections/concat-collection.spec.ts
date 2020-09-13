import _ from '../../src/index'
import { assert } from "chai";
import { ConcatCollection, Sequence } from '../../src/collection';

describe('ConcatCollection', function () {  
    it('should create', () => {
        const result = new ConcatCollection(new Sequence([1, 2, 3]), new Sequence([1, 2, 3]));
    });

    it('should concat with collection', () => {
        const expected = [1, 2, 3, 4, 5, 6];

        const result = new ConcatCollection(new Sequence([1, 2, 3]), new Sequence([4, 5, 6])).toArray();

        assert.deepEqual(result, expected)
    });

    it('should concat from chaining', () => {
        const collection = _([1, 2]);

        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const result = collection.concat([3, 4]).concat(_([5, 6, 7])).concat([8, 9]).toArray();

        assert.deepEqual(result, expected)
    });
});