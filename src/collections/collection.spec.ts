import { assert } from 'chai';
import {Collection} from './collection';

describe('Collection', function () {
    it('should create materialized collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)
        assert.isTrue(collection.materialized, 'Is not materialized');
    }); 
});