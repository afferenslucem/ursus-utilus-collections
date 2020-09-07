import { Collection, TakingCollection, PrependCollection } from "../collection";
import _ from '../../index'
import { assert } from "chai";

describe('PrependCollection', function () {  
    it('should create', () => {
        const result = new PrependCollection(new Collection([1, 2, 3]), 2);
    });

    it('should prepend', () => {
        const result = new PrependCollection(new Collection([1, 2, 3]), 2).toArray();

        const expected = [2, 1, 2, 3];

        assert.deepEqual(result, expected)
    });

    it('should prepend to empty array', () => {
        const result = new PrependCollection(new Collection([]), 2).toArray();

        const expected = [2];

        assert.deepEqual(result, expected)
    });

    it('should prepend', () => {
        const result = _([1, 2, 3]).prepend(2).toArray();

        const expected = [2, 1, 2, 3];

        assert.deepEqual(result, expected)
    });
});