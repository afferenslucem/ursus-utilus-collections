import { Comparer } from "../../src/utils/comparer";
import { assert } from "chai";


function defaultCompare(first, second): number {
    if(first < second) {
        return -1
    } else if (second < first) {
        return 1
    } else {
        return 0;
    }
}

describe('Comparer', function () {  
    it('should compare', () => {
        const comparer = new Comparer([
            {
                mapping: item => item[0]
            },
            {
                mapping: item => item[1]
            }
        ], defaultCompare);

        assert.equal(1, comparer.compare([2, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(-1, comparer.compare([1, 2], [2, 1]));
        assert.equal(-1, comparer.compare([1, 1], [1, 2]));
    });

    it('should compare with override func', () => {
        const comparer = new Comparer([
            {
                mapping: item => item[0],
                compare: (first, second) => second - first
            },
            {
                mapping: item => item[1]
            }
        ], defaultCompare);

        assert.equal(-1, comparer.compare([2, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [2, 1]));
        assert.equal(-1, comparer.compare([1, 1], [1, 2]));
    });
});