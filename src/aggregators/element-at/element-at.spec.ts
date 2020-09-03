import { assert } from "chai";
import _ from '../../index'
import {ElementAtAggregator} from './element-at'
import { Exception } from "../../exceptions/exceptions";

describe('ElementAtAggregator', function () {  
    it('should throw error on empty array', () => {
        const collection = _([]);

        const result = new ElementAtAggregator<number>(collection, 0);
        
        assert.throws(() => {
            result.aggregate();
        }, Exception.NoMatches);
    });

    it('should return el at position', () => {
        const collection = _([1, 2, 3]);

        const result = new ElementAtAggregator(collection, 1).aggregate();;
        
        assert.equal(result, 2)
    });
    
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