import { FilteringCollection, Collection } from "../../src/collections/collection";
import { assert } from "chai";
import { Cat, cats } from "./cats.spec";
import 'mocha-sinon';
import _ from '../../src/index'


describe('FilteringCollection', function () {  
    it('should filter empty array', () => {
        const items = [] as Cat[];

        const expected = [];

        const collection = new FilteringCollection(new Collection(items), cat => cat.age < 2);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should correct cascading', () => {
        const expected: Cat[] = [cats[2]];

        const collection = _(cats).where(cat => cat.age < 3).where(cat => cat.age > 1);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });
});