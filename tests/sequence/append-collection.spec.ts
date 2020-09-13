
import _ from '../../src/index'
import { assert } from "chai";
import { AppendCollection, Sequence } from '../../src/sequence';

describe('ApependCollection', function () {  
    it('should create', () => {
        const result = new AppendCollection(new Sequence([1, 2, 3]), 2);
    });

    it('should prepend', () => {
        const result = new AppendCollection(new Sequence([1, 2, 3]), 4).toArray();

        const expected = [1, 2, 3, 4];

        assert.deepEqual(result, expected)
    });

    it('should prepend to empty array', () => {
        const result = new AppendCollection(new Sequence([]), 2).toArray();

        const expected = [2];

        assert.deepEqual(result, expected)
    });

    it('should prepend', () => {
        const result = _([1, 2, 3]).append(2).toArray();

        const expected = [1, 2, 3, 2];

        assert.deepEqual(result, expected)
    });
});