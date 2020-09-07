import _, { ICollection } from '.';
import { assert } from 'chai';
import { Collection } from './collections/collection';
import { Exception } from './exceptions/exceptions';

describe('Index', function () {  
    it('should wrap native array', () => {
        const expected = _([1, 2, 3]);

        const result = _([1, 2, 3]);

        assert.deepEqual(expected, result);
    }); 

    it('should correct cascade', () => {
        const expected = ['25', '9'];

        const result = _([1, 2, 3, 4, 5, 6, 7, 8])
        .where(item => !!(item % 2)) // [1, 3, 5, 7]
        .select(item => (item ** 2).toString()) // ['1', '9', '25', '49']
        .skip(1) // ['9', '25', '49']
        .take(2) // ['9', '25']
        .sort() // ['25', '9']
        .toArray();

        assert.deepEqual(expected, result);
    });

    it('should take and skip combine', () => {
        const expected = [5, 6, 7, 8];

        const result = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        .skip(2).take(8).skip(2).take(4).toArray();

        assert.deepEqual(expected, result);
    });

    it('should generate range', () => {
        const collection = _.range(0, 5);

        const expected = _([0, 1, 2, 3, 4, 5]);

        assert.deepEqual(collection, expected)
    });

    it('should generate range with step', () => {
        const collection = _.range(0, 6, 2);

        const expected = _([0, 2, 4, 6]);

        assert.deepEqual(collection, expected)
    });   

    it('should generate range', () => {
        const collection = _.random(5, 5);

        const expected = 5;

        assert.deepEqual(collection.count(), expected)
    });    


    it('should create collection from object', () => {
        const obj = 1;

        const expect = [1];

        const result = _.of(obj).toArray();

        assert.deepEqual(expect, result);
    });
         
    it('should create collection by array', () => {
        const items = [1, 2, 3];
        const collection = _(items)
    });

    it('should throw error by creation from object', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = _({});
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from string', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = _('hello');
        }, Exception.WrongCollectionException)
    });

    it('should throw error by creation from number', () => {
        assert.throws(() => {
            // @ts-ignore
            const collection = _(1);
        }, Exception.WrongCollectionException)
    });
    
    it('should return true for containing element', () => {
        const expected = true;

        const result = _([1, 2, 3]).contains(2);

        assert.equal(expected, result);
    });
    
    it('should return false for not containing element', () => {
        const expected = false;

        const result = _([1, 2, 3]).contains(4);

        assert.equal(expected, result);
    });
    
    it('should throw error in chaining for empty collection', () => {        
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).first();
        }, 'No matches found');
    });
    
    it('should throw error in chaining for always falsy condition', () => {
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).first(item => item > 1000);
        }, 'No matches found');
    });
    
    it('should return null in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).firstOrDefault();
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return default in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).firstOrDefault(0);
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).firstOrDefault(null, item => item > 1000);
            
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return 0 in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).firstOrDefault(0, item => item > 1000);
            
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should throw error in chaining for empty collection', () => {        
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).last();
        }, 'No matches found');
    });
    
    it('should throw error in chaining for always falsy condition', () => {
        assert.throws(() => {
            _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).last(item => item > 1000);
        }, 'No matches found');
    });
    
    it('should return null in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).lastOrDefault();
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return default in chaining for empty collection', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).select(item => item ** 2).where(item => item > 1000).lastOrDefault(0);
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should return null in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).lastOrDefault(null, item => item > 1000);
            
        const expected = null;
        
        assert.equal(result, expected)
    });
    
    it('should return 0 in chaining for always falsy condition', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8]).where(item => item > 3).lastOrDefault(0, item => item > 1000);
            
        const expected = 0;
        
        assert.equal(result, expected)
    });
    
    it('should return 2 like average', () => {
        const result = _([1, 2, 3, 4, 5, 6, 7, 8, 9]).average();
            
        const expected = 5;
        
        assert.equal(result, expected)
    });
    
    it('should return 2 like average', () => {
        const result = _([[1], [2, 3], [4, 5, 6]]).average(item => item.length);
            
        const expected = 2;
        
        assert.equal(result, expected)
    });
    
    it('should skip while elements < 5', () => {
        const result = _.range(1, 10).skipWhile(item => item < 5).toArray();
            
        const expected = _.range(5, 10).toArray();
        
        assert.deepEqual(result, expected)
    });
    
    it('should take wile elements < 5', () => {
        const result = _.range(1, 10).takeWhile(item => item < 5).toArray();
            
        const expected = _.range(1, 4).toArray();
        
        assert.deepEqual(result, expected)
    });
    
    it('returns truthly contains by eq comparer', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },{
            name: 'Lulya',
            age: 1
        },];

        const cat = {
            name: 'Barsik',
            age: 9
        }

        const result = _(cats).contains(cat, (a, b) => a.name == b.name);
            
        const expected = true;
        
        assert.deepEqual(result, expected)
    });
    
    it('returns falsy contains by eq comparer', () => {
        const cats = [{
            name: 'Barsik',
            age: 9
        },{
            name: 'Cherry',
            age: 4
        },{
            name: 'Feya',
            age: 4
        },{
            name: 'Lulya',
            age: 1
        },];

        const cat = {
            name: 'Tom',
            age: 9
        }

        const result = _(cats).contains(cat, (a, b) => a.name == b.name);
            
        const expected = false;
        
        assert.deepEqual(result, expected)
    });
});