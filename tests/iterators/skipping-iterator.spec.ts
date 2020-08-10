import { FilteringIterator } from "../../src/iterators/filtering-iterator";
import { NativeArrayIterator } from "../../src/iterators/native-array-iterator";
import { assert } from "chai";
import { SkippingIterator } from "../../src/iterators/skipping-iterator";

describe('SkippingIterator', function () {  
    it('should skip data', () => {
        const expected = [4, 5, 6];

        const iterator = new SkippingIterator<number>(new NativeArrayIterator([1, 2, 3, 4, 5, 6]), 3);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
    it('should return empty array if skip vallue greater the entries count', () => {
        const expected = [];

        const iterator = new SkippingIterator<number>(new NativeArrayIterator([1, 2, 3, 4, 5, 6]), 7);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
});