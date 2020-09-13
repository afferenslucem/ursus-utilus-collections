import _ from '../../src/index'
import { assert } from "chai";
import { PrependCollection, Sequence } from '../../src/collection';

describe('PrependCollection', function () {  
    it('should create', () => {
        const result = new PrependCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should prepend', () => {
        const result = new PrependCollection(new Sequence([1, 2, 3]), 2).toArray();

        const expected = [2, 1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should prepend to empty array', () => {
        const result = new PrependCollection(new Sequence([]), 2).toArray();

        const expected = [2];

        assert.deepEqual(result, expected)
    });

    it('should prepend', () => {
        const result = _([1, 2, 3]).prepend(2).toArray();

        const expected = [2, 1, 2, 3];

        assert.deepEqual(result, expected)
    });
});