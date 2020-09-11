import { assert } from "chai";
import _ from '../../src/index';
import { combine, of, empty, repeat, range, random } from "../../src/utils/operators";


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


describe('of', function () {  
    it('should create collection from object', () => {
        const obj = 1;

        const expect = [1];

        const result = of(obj).toArray();

        assert.deepEqual(expect, result);
    });
});


describe('empty', function () {  
    it('should create empty collection', () => {
        const result = empty();

        const expect = _([]);

        assert.deepEqual(expect, result);
    });
});


describe('repeat', function () {  
    it('should create collection', () => {
        const result = repeat(5, 3);

        const expect = _([5, 5, 5]);

        assert.deepEqual(expect, result);
    });
});


describe('range', function () {  
    it('should generate range', () => {
        const collection = range(0, 5);

        const expected = _([0, 1, 2, 3, 4, 5]);

        assert.deepEqual(collection, expected)
    });

    it('should generate range with step', () => {
        const collection = range(0, 6, 2);

        const expected = _([0, 2, 4, 6]);

        assert.deepEqual(collection, expected)
    });   
});


describe('random', function () {  
    it('should generate range', () => {
        const collection = random(5, 5);

        const expected = 5;

        assert.deepEqual(collection.count(), expected)
    });
});