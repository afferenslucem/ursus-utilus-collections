import { assert } from 'chai';
import _ from '../../src/index';
import { Sequence } from '../../src/collection';
import { Exception } from '../../src/exceptions/exceptions';

describe('Sequence', function () {
    it('should create materialized collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Sequence(items)
        assert.isTrue(collection.materialized, 'Is not materialized');
    });

    it('should create collection by array', () => {
        const items = [1, 2, 3];
        const collection = new Sequence(items)
    });

    it('should create collection by collection', () => {
        const items = [1, 2, 3];
        const collection = new Sequence(items);
        const collectionByOtherCollection = new Sequence(collection);
    });
    
    it('should return true for containing element', () => {
        const items = [1, 2, 3];
        const collection = new Sequence(items)

        const expected = true;

        const result = collection.contains(2);

        assert.equal(expected, result);
    });
    
    it('should return false for not containing element', () => {
        const items = [1, 2, 3];
        const collection = new Sequence(items)

        const expected = false;

        const result = collection.contains(4);

        assert.equal(expected, result);
    });

    it('should throw error by creation from object', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Sequence({});
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from string', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Sequence('hello');
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from number', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = new Sequence(1);
        }, Exception.WrongCollectionException)
    });
});