import {Collection} from '../../src/collections/collection';
import { assert } from 'chai';

describe('Collection', function () {  
    it('should log debug by console.log', () => {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const expected = [6, 12];

        const collection = new Collection<number>(items);

        const result = collection.where(item => item % 2 == 0).where(item => item % 3 == 0).toArray();

        assert.deepEqual(result, expected);
    });  
});