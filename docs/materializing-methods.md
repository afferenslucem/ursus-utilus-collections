# Materializing Methods

Materializing methods trigger computation of your query. All your chain of methods will be runned for taking result.

* [toArray](#toArray)
* [toLookup](#toLookup)
* [toDictionary](#toDictionary)

## toArray

Method signature: `toArray(): T[]`.

Creates an array from sequence.

```typescript
const concated = _([1, 2, 3).toArray();

console.log(concated); // [ 1, 2, 3, ]
```

## toLookup

Method signature: `toLookup<TKey>(keySelector: MapCondition<T, TKey>): ILookup<TKey, T>`.

Creates a `ILookup<TKey, T[]>` from an sequence according to a specified key selector function by using default equality comparer.

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

console.log(result);
//  [
//     [9, [ { name: 'Barsik', age: 9 } ]
//     ],
//     [4, [
//             { name: 'Cherry', age: 4 },
//             { name: 'Feya', age: 4 }
//         ]
//     ],
//     [1, [ { name: 'Lulya', age: 1 } ] ],
// ]
```

### toLookup with element selector

Method signature: `toLookup<TKey, TElement>(key: MapCondition<T, TKey>, element: MapCondition<T, TElement>): Map<TKey, TElement[]>`.

Creates a `Map<TKey, TElement[]>` from an sequence according to specified key selector and element selector functions.

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

console.log(result);
// [
//     [9, [ 'Barsik'] ],
//     [4, ['Cherry', 'Feya' ] ],
//     [1, ['Lulya'] ],
// ]
```

## toDictionary

Method signature: `toDictionary<TKey>(keySelector: MapCondition<T, TKey>): Dictionary<TKey, T>`.

Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions by using default equality comparer.

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

const result = _(cats).toDictionary(item => item.age).entries()

console.log(result)
// [
//     [1, { name: 'Lulya',  age: 1 } ],
//     [4, { name: 'Cherry', age: 4 } ],
//     [9, { name: 'Barsik', age: 9 } ],
// ]
```

## toDictionary with element selector

Method signature: `toDictionary<TKey, TElement>(keySelector: MapCondition<T, TKey>, elementSelector: MapCondition<T, TElement>): Dictionary<TKey, TElement>`.

Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions by using default equality comparer.

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

const result = _(cats).toDictionary(item => item.age, item => item.name).entries()

assert.deepEqual(result, [
    [1, 'Lulya'],
    [4, 'Cherry'],
    [9, 'Barsik'],
])

console.log(result)
// [
//     [9, 'Barsik'],
//     [4, 'Cherry'],
//     [1, 'Lulya'],
// ]
```
