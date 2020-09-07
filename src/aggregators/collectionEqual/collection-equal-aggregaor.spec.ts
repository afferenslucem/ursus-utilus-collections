import { assert } from "chai";
import _ from '../../index'
import { CollectionEqualAggregator } from './collection-equal-aggregaor';

describe('CollectionEqualAggregator', function () {  
    it('should create', () => {
        const collection = _([8, 5, 4, 2, 9, 1, 4]);

        new CollectionEqualAggregator(collection, collection);
    });
    
    it('should return false', () => {
        const first = _.range(1, 5);
        const second = _.range(1, 3);

        const eq = new CollectionEqualAggregator(first, second).aggregate();

        assert.isFalse(eq)
    });
    
    it('should return true', () => {
        const first = _.range(1, 5);
        const second = _.range(1, 5);

        const eq = new CollectionEqualAggregator(first, second).aggregate();

        assert.isTrue(eq)
    });
    
    it('should return false', () => {
        const first = _.range(1, 5);
        const second = _.range(2, 6);

        const eq = new CollectionEqualAggregator(first, second).aggregate();

        assert.isFalse(eq)
    });
    
    it('should return true', () => {
        const first = _.range(1, 5);
        const second = _(['1', '2', '3', '4', '5', ]);

        // @ts-ignore
        const eq = new CollectionEqualAggregator(first, second, (a, b) => a === Number(b)).aggregate();

        assert.isTrue(eq)
    });
    
    it('should return true', () => {
        const eq = _.range(1, 5).collectionEqual([1, 2, 3, 4, 5])

        assert.isTrue(eq)
    });
    
    it('should return true', () => {
        // @ts-ignore
        const eq = _.range(1, 5).collectionEqual(_(['1', '2', '3', '4', '5']), (a, b) => a === Number(b));

        assert.isTrue(eq)
    });
});