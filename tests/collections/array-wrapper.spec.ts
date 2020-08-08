import {NativeArrayWrapper} from '../../src/collections/native-array-wrapper';
import { assert } from 'chai';

describe('NativeArrayWrapper', function () {  
    it('should correct wrap native array', () => {
        const expected = [1, 2, 3];

        const result = [];

        const wrapper = new NativeArrayWrapper(...expected);

        for(let item of wrapper) {
            result.push(item);
        }

        assert.deepEqual(result, expected);
    });  
});