import _ from '../../src/index'
import { assert } from "chai";
import { FilteringCollection, Sequence } from '../../src/sequence';

describe('FilteringCollection', function () {  
    it('should create', () => {
        const result = new FilteringCollection(new Sequence([1, 2, 3]), item => !!item);
    });

    it('should return filtered from toArray()', () => {
        const result = new FilteringCollection(new Sequence([8, 5, 4, 2, 9, 1, 4]), item => (item % 2) == 0).toArray();
        const expected = [8, 4, 2, 4];

        assert.deepEqual(result, expected);
    });

    it('should return double filtered from toArray()', () => {
        const result = new FilteringCollection(new Sequence([8, 5, 4, 2, 9, 1, 4]), item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected = [4, 4];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection', () => {
        const result = new FilteringCollection(new Sequence([]), item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });
    
    it('should return filtered from chaining', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).where(item => (item % 2) == 0).toArray();
        const expected = [8, 4, 2, 4];

        assert.deepEqual(result, expected);
    });

    it('should return double filtered from chaining', () => {
        const result = _([undefined, 0, 3, undefined, 4, 6, 9]).where(item => !!item).where(item => item.toString() > '5').toArray();
        
        assert.deepEqual(result, [6, 9])
    });

    it('should filter in correct order', () => {
        const result = _([8, 5, 4, 2, 9, 1, 4]).where(item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected = [4, 4];

        assert.deepEqual(result, expected);
    });

    it('should return empty for empty collection from chaining', () => {
        const result = _([]).where(item => (item % 2) == 0).where(item => ((item + 1) % 5 == 0)).toArray();
        const expected: number[] = [];

        assert.deepEqual(result, expected);
    });
});
