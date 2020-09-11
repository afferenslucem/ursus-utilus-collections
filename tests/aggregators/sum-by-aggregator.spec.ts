import { assert } from "chai";
import _ from '../../src/index'

describe('SumByAggregator', function () {    
    it('should returns sum of strings with condition', () => {
        const collection = _(['1', '2', '3',]);

        const expected = '6';

        const result = collection.sum(item => Number(item)).toString();

        assert.equal(result, expected)
    });
});