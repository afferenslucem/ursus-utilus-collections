
import _ from '../../src/index'
import { assert } from "chai";
import { Lookup } from '../../src/collections/lookup';

describe('Lookup With String Key', function () {  
    let storage: Lookup<string, string, number> = null;

    beforeEach(() => {
        storage = new Lookup<string, string, number>(
            ['1', '2', '2', '3', '3', '3'],
            item => item,
            item => Number(item)
        );
    })

    it('should create', () => {
        const result = new Lookup<string, string, number>(
            ['1', '2', '2', '3', '3', '3'],
            item => item,
            item => Number(item)
        );
    });

    it('count should be 3', () => {
        const expected = 3;
        const result = storage.count;

        assert.deepEqual(result, expected);
    });

    it('get should return collection', () => {
        const expected = [3, 3 ,3];
        const result = storage.get('3');

        assert.deepEqual(result, expected);
    });

    it('should return empty array for unexisting key', () => {
        const expected = [];
        const result = storage.get('aaa');

        assert.deepEqual(result, expected);
    });

    it('should return entries', () => {
        const expected = [
            ['1', [1]],
            ['2', [2, 2]],
            ['3', [3, 3, 3]],
        ];
        const result = storage.entries();

        assert.deepEqual(result, expected);
    });

    it('should return true for contains key', () => {
        const expected = true;
        const result = storage.contains('1');

        assert.equal(result, expected);
    });

    it('should return false for not contains key', () => {
        const expected = false;
        const result = storage.contains('a');

        assert.equal(result, expected);
    });
});

describe('Lookup With Number Key', function () {  
    let storage: Lookup<string, number, string> = null;

    beforeEach(() => {
        storage = new Lookup<string, number, string>(
            ['1', '2', '2', '3', '3', '3'],
            item => Number(item),
            item => item,
        );
    })

    it('should create', () => {
        const result = new Lookup<string, number, string>(
            ['1', '2', '2', '3', '3', '3'],
            item => Number(item),
            item => item,
        );
    });

    it('should return entries', () => {
        const expected = [
            [1, ['1']],
            [2, ['2', '2']],
            [3, ['3', '3', '3']],
        ];
        const result = storage.entries();

        assert.deepEqual(result, expected);
    });
});