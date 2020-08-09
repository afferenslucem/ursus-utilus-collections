import { NativeArrayIterator } from "../../src/iterators/native-array-iterator";
import { assert } from "chai";
import { TakingIterator } from "../../src/iterators/taking-iterator";

describe('TakingIterator', function () {  
    it('should skip data', () => {
        const expected = [1, 2, 3];

        const iterator = new TakingIterator<number>(new NativeArrayIterator(...[1, 2, 3, 4, 5, 6]), 3);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
    it('should return empty array if skip vallue greater the entries count', () => {
        const expected = [1, 2, 3, 4, 5, 6];

        const iterator = new TakingIterator<number>(new NativeArrayIterator(...[1, 2, 3, 4, 5, 6]), 10);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
});