import { assert } from "chai";
import _ from '../../src/index'
import { Exception } from "../../src/exceptions/exceptions";

describe('SingleOrDefaultAggregator', function () {

    it('should return alone element', () => {
        const result = _.of(3).single();

        const expected = 3;

        assert.deepEqual(result, expected);
    });
    
    it('should throw error', () => {
        assert.throws(() => {
            const collection = _.range(1, 3).single();
        }, Exception.SoManyElements)
    });
    
    it('should return null', () => {
        const result = _.empty<number>().singleOrDefault();

        const expected = null;

        assert.deepEqual(result, expected);
    });

    it('should return default element', () => {
        const result = _.empty<number>().singleOrDefault(0);

        const expected = 0;

        assert.deepEqual(result, expected);
    });
});