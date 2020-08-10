import { FilteringIterator } from "../../src/iterators/filtering-iterator";
import { NativeArrayIterator } from "../../src/iterators/native-array-iterator";
import { assert } from "chai";

describe('FilterIterator', function () {  
    it('should filter data', () => {
        const expected = [1, 3, 5];

        const iterator = new FilteringIterator<number>(new NativeArrayIterator([1, 2, 3, 4, 5, 6]), [item => item % 2 == 1]);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
});