import { assert } from "chai";
import _ from '../../src/index'
import { equal } from "assert";

describe('SequenceEqualAggregator', function () {    
    it('should return true', () => {
        const eq = _.range(1, 5).sequenceEqual([1, 2, 3, 4, 5])

        assert.isTrue(eq)
    });
    
    it('should return true', () => {
        // @ts-ignore
        const eq = _.range(1, 5).sequenceEqual(_(['1', '2', '3', '4', '5']), {
            equal: (a, b) => Number(a) == Number(b)
        });

        assert.isTrue(eq)
    });
});