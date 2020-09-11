import { assert } from "chai";
import _ from '../../src/index'
import { Exception } from "../../src/exceptions/exceptions";
describe('ElementAtAggregator', function () {    
    it('should return element', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).elementAt(3);

        const expected = 4;
        
        assert.equal(result, expected)
    });
    
    it('should return default', () => {        
        assert.throws(() => {
            const result = _([1, 2, 3, 4, 5, 6, 7, 8]).elementAt(10);
        }, Exception.NoMatches);
    });
});