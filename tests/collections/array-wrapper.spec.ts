import { describe, it } from 'mocha';
import { assert } from 'chai';
import {NativeArrayWrapper} from '../../src/collections/native-array-wrapper';

describe('NativeArrayWrapper', function () {  
    it('should log debug by console.log', () => {
        const expected = [1, 2, 3];

        const result = [];

        const wrapper = new NativeArrayWrapper(...expected);

        for(let item of wrapper) {
            result.push(item);
        }

        assert.deepEqual(result, expected);
    });  
});