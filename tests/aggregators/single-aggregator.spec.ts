import { assert } from "chai";
import _ from '../../src/index'
import { Exception } from "../../src/exceptions/exceptions";

describe('SingleAggregator', function () {
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
    
    it('should throw error', () => {
        assert.throws(() => {
            _.empty().single();
        }, Exception.NoMatches)
    });
});