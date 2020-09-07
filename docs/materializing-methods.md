# Materializing Methods

Materializing methods trigger computation of your query. All your chain of methods will be runned for taking result.

* [toArray](#toArray)
* [toLookup](#toLookup)

## toArray

Method signature: `toArray(): T[]`.

Creates an array from collection

```typescript
const concated = _([1, 2, 3).toArray();

console.log(concated); // [ 1, 2, 3, ]
```

## toLookup

Method signature: `toLookup<TKey>(key: MapCondition<T, TKey>): Map<TKey, T[]>`.

Creates a `Map<TKey, T[]>` from an collection according to a specified key selector function.

```typescript
const cats = [{
    name: 'Barsik',
    age: 9
}, {
    name: 'Cherry',
    age: 4
}, {
    name: 'Feya',
    age: 4
}, {
    name: 'Lulya',
    age: 1
},];

const result = Array.from(_(cats).toLookup(item => item.age));
// Lookup cats by age

assert.deepEqual(result, [
    [9,
        [{
            name: 'Barsik',
            age: 9
        }]
    ],
    [4,
        [{
            name: 'Cherry',
            age: 4
        }, {
            name: 'Feya',
            age: 4
        }]
    ],
    [1,
        [{
            name: 'Lulya',
            age: 1
        }]
    ],
])
```

### toLookup with element selector

Method signature: `toLookup<TKey, TElement>(key: MapCondition<T, TKey>, element: MapCondition<T, TElement>): Map<TKey, TElement[]>`.

Creates a `Map<TKey, TElement[]>` from an collection according to specified key selector and element selector functions.

```typescript
const cats = [{
    name: 'Barsik',
    age: 9
}, {
    name: 'Cherry',
    age: 4
}, {
    name: 'Feya',
    age: 4
}, {
    name: 'Lulya',
    age: 1
},];

const result = Array.from(_(cats).toLookup(item => item.age, item => item.name));

assert.deepEqual(result, [
    [9,
        ['Barsik',]
    ],
    [4,
        ['Cherry', 'Feya',]
    ],
    [1, ['Lulya']],
])
```
