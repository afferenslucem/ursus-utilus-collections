import { assert } from "chai";
import { combine } from './operators';
import _ from '../index';


describe('combine', function () {  
    it('should combine with array', () => {
        const obj = 1;
        const items = [2, 3, 4, 5];

        const expect = [[1, 2], [1, 3], [1, 4], [1, 5]];

        const result = combine(obj, items);

        assert.deepEqual(expect, result);
    });

    it('should combine with collection', () => {
        const obj = 1;
        const items = _([2, 3, 4, 5]);

        const expect = [[1, 2], [1, 3], [1, 4], [1, 5]];

        const result = combine(obj, items);

        assert.deepEqual(expect, result);
    });

    it('should combine with empty array', () => {
        const obj = 1;
        const items = [];

        const expect = [];

        const result = combine(obj, items);

        assert.deepEqual(expect, result);
    });

    it('should combine with empty collection', () => {
        const obj = 1;
        const items = _([]);

        const expect = [];

        const result = combine(obj, items);

        assert.deepEqual(expect, result);
    });
});