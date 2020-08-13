import { GroupingCollection, Collection } from "../../src/collections/collection";
import { assert } from "chai";
import { IGroupedData } from "../../src/interfaces/i-grouped-data";
import { Cat, cats } from "./cats.spec";
import { ICollection } from "../../src";
import _ from '../../src/index'

describe('GroupingCollection', function () {  
    it('should group empty array', () => {
        const items = [] as Cat[];

        const expected = [];

        const collection = new GroupingCollection(new Collection(items), cat => cat.age);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should group ge age and convert', () => {
        const expected: IGroupedData<number, ICollection<Cat>>[] = [
            {
                key: 1,
                group: _([{
                    age: 1,
                    color: 'black',
                    name: 'Bonya'
                },
                {
                    age: 1,
                    color: 'brown',
                    name: 'Murka'
                }])
            },
            {
                key: 2,
                group: _([{
                    age: 2,
                    color: 'gray',
                    name: 'Lulya'
                }])
            },
            {
                key: 3,
                group: _([
                    {
                        age: 3,
                        color: 'gray',
                        name: 'Feya'
                    },
                    {
                        age: 3,
                        color: 'black',
                        name: 'Cherry'
                    }
                ])
            }
        ];

        const collection = new GroupingCollection(new Collection(cats), cat => cat.age);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });

    it('should group and convert', () => {
        const expected: IGroupedData<number, string>[] = [{
            key: 1,
            group: 'Bonya'
        },
        {
            key: 2,
            group: 'Lulya'
        },
        {
            key: 3,
            group: 'Feya'
        }];
        
        const col = new NativeArrayWrapper(cats);

        const collection = new GroupingCollection(new Collection(cats), cat => cat.age, group => group.first().name);

        const result = collection.toArray();

        assert.deepEqual(result, expected);
    });
});