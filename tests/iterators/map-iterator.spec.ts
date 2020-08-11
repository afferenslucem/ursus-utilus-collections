import { FilteringIterator } from "../../src/iterators/filtering-iterator";
import { NativeArrayIterator } from "../../src/iterators/native-array-iterator";
import { assert } from "chai";
import { MappingIterator } from "../../src/iterators/mapping-iterator";

describe('MappingIterator', function () {  
    it('should map data', () => {
        const expected = [1, 9, 25];

        const iterator = new MappingIterator<number, number>(new NativeArrayIterator([1, 3, 5]), [item => item ** 2]);

        const obj = {
            [Symbol.iterator]: function() {
                return iterator;
            }
        }

        const result = Array.from(obj);

        assert.deepEqual(expected, result);
    });
});