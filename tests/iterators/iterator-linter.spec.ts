import { assert } from 'chai';
import {IteratorLinter} from '../../src/iterators/iterator-linter';
import { NativeArrayWrapper } from '../../src/collections/native-array-wrapper';

describe('IteratorLinter', function () {  
    it('should correct lints different iterables', () => {
        const expected = [1, 2, 3, 4, 5, 6];

        const first = [1, 2, 3];
        const second = [4, 5, 6];

        const result = [];

        const wrapper1 = new NativeArrayWrapper(first);
        const wrapper2 = new NativeArrayWrapper(second);

        const linter = new IteratorLinter(wrapper1[Symbol.iterator](), wrapper2[Symbol.iterator]());

        const mock = {
            [Symbol.iterator]() {
                return linter;
            }
        }

        for(let item of mock) {
            result.push(item);
        }

        assert.deepEqual(result, expected);
    });  
});