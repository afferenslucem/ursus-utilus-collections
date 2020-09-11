import { Comparer, SortDirection } from "../../src/utils/comparer";
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
    it('should compare asc', () => {
        const comparer = new Comparer<[number, number], number>([
            {
                mapping: item => item[0],
                direcion: SortDirection.Asc
            },
            {
                mapping: item => item[1],
                direcion: SortDirection.Asc
            }
        ], defaultCompare);

        assert.equal(1, comparer.compare([2, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(-1, comparer.compare([1, 2], [2, 1]));
        assert.equal(-1, comparer.compare([1, 1], [1, 2]));
    });

    it('should compare desc', () => {
        const comparer = new Comparer<[number, number], number>([
            {
                mapping: item => item[0],
                direcion: SortDirection.Desc
            },
            {
                mapping: item => item[1],
                direcion: SortDirection.Desc
            }
        ], defaultCompare);

        assert.equal(-1, comparer.compare([2, 1], [1, 1]));
        assert.equal(-1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [2, 1]));
        assert.equal(1, comparer.compare([1, 1], [1, 2]));
    });

    it('should compare asc with override func', () => {
        const comparer = new Comparer<[number, number], number>([
            {
                mapping: item => item[0],
                compare: (first, second) => second - first,
                direcion: SortDirection.Asc
            },
            {
                mapping: item => item[1],
                direcion: SortDirection.Asc
            }
        ], defaultCompare);

        assert.equal(-1, comparer.compare([2, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(1, comparer.compare([1, 2], [2, 1]));
        assert.equal(-1, comparer.compare([1, 1], [1, 2]));
    });

    it('should compare desc with override func', () => {
        const comparer = new Comparer<[number, number], number>([
            {
                mapping: item => item[0],
                compare: (first, second) => second - first,
                direcion: SortDirection.Desc
            },
            {
                mapping: item => item[1],
                direcion: SortDirection.Desc
            }
        ], defaultCompare);

        assert.equal(1, comparer.compare([2, 1], [1, 1]));
        assert.equal(-1, comparer.compare([1, 2], [1, 1]));
        assert.equal(0, comparer.compare([1, 1], [1, 1]));
        assert.equal(-1, comparer.compare([1, 2], [2, 1]));
        assert.equal(1, comparer.compare([1, 1], [1, 2]));
    });
});