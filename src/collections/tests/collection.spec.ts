import { assert } from 'chai';
import _ from '../../index';
import {Collection} from '../collection';
import { Exception } from '../../exceptions/exceptions';

describe('Collection', function () {
    it('should create materialized collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)
        assert.isTrue(collection.materialized, 'Is not materialized');
    });

    it('should create collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)
    });

    it('should create collection by collection', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items);
        const collectionByOtherCollection = new Collection(collection);
    });
    
    it('should return true for containing element', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)

        const expected = true;

        const result = collection.contains(2);

        assert.equal(expected, result);
    });
    
    it('should return false for not containing element', () => {
        const items = [1, 2, 3];
        const collection = new Collection(items)

        const expected = false;

        const result = collection.contains(4);

        assert.equal(expected, result);
    });

    it('should throw error by creation from object', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Collection({});
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from string', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Collection('hello');
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from number', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Collection(1);
        }, Exception.WrongCollectionException)
    });
});