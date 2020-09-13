import { assert } from "chai";
import { DefaultEqualityComparer } from '../../src/utils/abstract-equlity-comparer'

describe('DefaultEqqualityComparer', function () {  
    it('should create', () => {
        new DefaultEqualityComparer();
    });
    it('should return false for different', () => {
        const comparer = new DefaultEqualityComparer();

        const first = {
            name: 'Josh'
        };

        const second = {
            name: 'Josh'
        };

        assert.isFalse(comparer.equal(first, second))
    });
    it('should return true for same', () => {
        const comparer = new DefaultEqualityComparer();

        const first = {
            name: 'Josh'
        };

        assert.isTrue(comparer.equal(first, first))
    });
});