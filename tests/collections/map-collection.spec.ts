import { assert } from "chai";
import { Cat, cats } from "./cats.spec";
import _ from '../../src/index'
import { MappingCollection } from "../../src/collections/collection";


describe('MapCollection', function () {  
    it('should map empty array', () => {
        const items = [] as Cat[];

        const expected = [];

        const collection = new MappingCollection<Cat, number>(items, [cat => cat.age ** 2]);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should correct cascading', () => {
        const expected = [1, 1, 16, 81, 81];

        const collection = _(cats).select(cat => cat.age).select(item => item ** 2).select(item => item ** 2);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });
});