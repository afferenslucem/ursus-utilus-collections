import { FilteringCollection, Collection } from "../../src/collections/collection";
import { assert } from "chai";
import { Cat, cats } from "./cats.spec";
import 'mocha-sinon';
import sinon from 'sinon';
import _ from '../../src/index'
import { NativeArrayWrapper } from "../../src/collections/native-array-wrapper";


describe('FilteringCollection', function () {  
    it('should filter empty array', () => {
        const items = [] as Cat[];

        const expected = [];

        const collection = new FilteringCollection(items, cat => cat.age < 2);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should correct cascading', () => {
        const expected: Cat[] = [cats[2]];

        const collection = _(cats).where(cat => cat.age < 3).where(cat => cat.age > 1);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should materialize only once', function () {
        const wrapper = new NativeArrayWrapper([1, 2, 3, 4]);

        const collection = new Collection(wrapper);
                        
        //@ts-ignore
        collection.materialize = sinon.fake();

        const first = collection.where(item => item > 1);
        //@ts-ignore
        this.sinon.stub(first, 'materialize');

        const second = first.where(item => item > 2);
        //@ts-ignore
        this.sinon.stub(second, 'materialize');

        const third = second.where(item => item > 3);

        //@ts-ignore
        this.sinon.stub(third, 'materialize');

        const result = third.toArray();

        // @ts-ignore
        assert.equal(collection.materialize.callCount, 0, 'Was called');

        // @ts-ignore
        assert.equal(first.materialize.callCount, 0, 'Was called');

        // @ts-ignore
        assert.equal(second.materialize.callCount, 0, 'Was called');

        // @ts-ignore
        assert.equal(third.materialize.callCount, 1, 'Wasn\'t called');
    });

    it('should materialize only once', function () {
        const wrapper = new NativeArrayWrapper([1, 2, 3, 4]);

        const collection = new Collection(wrapper);
                        
        //@ts-ignore
        wrapper.materialize = sinon.fake.returns([1, 2, 3, 4]);

        const first = collection.where(item => item > 1);
        //@ts-ignore
        this.sinon.stub(first, 'materialize');

        const second = first.where(item => item > 2);
        //@ts-ignore
        this.sinon.stub(second, 'materialize');

        const third = second.where(item => item > 3);

        const result = third.toArray();

        // @ts-ignore
        assert.equal(wrapper.materialize.callCount, 1, 'Wasn\'t called');

        // @ts-ignore
        assert.equal(first.materialize.callCount, 0, 'Was called');

        // @ts-ignore
        assert.equal(second.materialize.callCount, 0, 'Was called');

        assert.deepEqual(result, [4]);
    });
});