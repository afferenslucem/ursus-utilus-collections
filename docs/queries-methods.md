# Querring Methods

* [distinct](#distinct)
* [groupBy](#groupBy)
* [orderBy](#orderBy)
* [orderByDescending](#orderByDescending)
* [reverse](#reverse)
* [select](#select)
* [selectMany](#selectMany)
* [skip](#skip)
* [sort](#sort)
* [sortDescending](#sortDescending)
* [take](#take)
* [where](#where)

## distinct

Method signature: `distinct(): ICollection<T>`.

Returns distinct elements from a collection.

```typescript
const distinct = _([1, 3, 2, 2, 3, 1, 1, 2]).distinct().toArray();

console.log(distinct); // [ 1, 3, 2 ]
```

### Distinct by field

Method signature: `distinct<V>(mapping: (item: T) => V): ICollection<T>`.

Returns distinct elements by field from a collection.

```typescript
const cats = [{
    name: 'Tom',
    age: 1
},
{
    name: 'Bonny',
    age: 3
},
{
    name: 'Feya',
    age: 2
},
{
    name: 'Cherry',
    age: 2
}]

const distinct = _(cats).distinct(item => item.age).toArray();
// getiing cats distinct by age

console.log(distinct)
// [ { name: 'Tom', age: 1 }, { name: 'Bonny', age: 3 }, { name: 'Feya', age: 2 } ]
```

## groupBy

Method signature: `groupBy<TKey>(key: MapCondition<T, TKey>): ICollection< IGroupedData<TKey, ICollection<T>> >`.

Groups the elements of a collection.

```typescript
const cats = [{
    name: 'Tom',
    age: 1
},
{
    name: 'Feya',
    age: 2
},
{
    name: 'Cherry',
    age: 2
}]

const grouped = _(cats).groupBy(item => item.age).toArray();
// Grouping cats by age

console.log(grouped);
// [
//   { key: 1, group: _([{name: Tom, age: 1}]) },
//   { key: 2, group: _([{name: Feya, age: 2}, {name: Cherry, age: 2}]) },
// ]
```

### Grouping with mapping result

Method signature: `groupBy<TKey, TValue>(key: MapCondition<T, TKey>, groupMap: MapCondition<ICollection<T>, TValue>): ICollection<IGroupedData<TKey, TValue>>`.

Groups the elements of a collection and aggregates it.

```typescript
const cats = [{
    name: 'Tom',
    age: 1
},
{
    name: 'Feya',
    age: 2
},
{
    name: 'Cherry',
    age: 2
}]

const grouped = _(cats).groupBy(item => item.age, group => group.count()).toArray();
// Counting cats by age

console.log(grouped);
// [
//   { key: 1, group: 1 },
//   { key: 2, group:2 },
// ]
```

## orderBy

Method signature: `orderBy<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>`.

Sorts the elements of a collection in ascending order to a key.

```typescript
const cats = [{
    name: 'Tom',
    age: 3
},
{
    name: 'Bonny',
    age: 3
},
{
    name: 'Feya',
    age: 2
},
{
    name: 'Cherry',
    age: 2
}]

const ordered = _(cats).orderBy(item => item.age).toArray(); // Sorts cats by age

console.log(ordered);
//[ { name: 'Feya',   age: 2 },
//  { name: 'Cherry', age: 2 },
//  { name: 'Tom',    age: 3 },
//  { name: 'Bonny',  age: 3 } ]
```

## orderByDescending

Method signature: `orderBy<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>`.

Sorts the elements of a collection in descending order to a key.

```typescript
const cats = [{
    name: 'Tom',
    age: 3
},
{
    name: 'Bonny',
    age: 3
},
{
    name: 'Feya',
    age: 2
},
{
    name: 'Cherry',
    age: 2
}]

const ordered = _(cats).orderByDescending(item => item.name).toArray(); // Sorts cats by name descending

console.log(ordered);
//[ { name: 'Tom', age: 3 },
//  { name: 'Feya', age: 2 },
//  { name: 'Cherry', age: 2 },
//  { name: 'Bonny', age: 3 } ]
```

## reverse

Method signature: `reverse(): ICollection<T>`.

```typescript
const reverced = _([1, 2, 3, 4, 5]).reverse().toArray();

console.log(reverced); // [ 5, 4, 3, 2, 1 ]
```

## select

Method signature: `select<TResult>(condition: (item: T) => T2): ICollection<TResult>`.

Converts each element of a collection into a new form.

```typescript
const selected = _([1, 2, 3, 4, 5]).select(item => item ** 2).toArray();

console.log(selected); // [ 1, 4, 9, 16, 25 ]
```

## selectMany

Method signature: `select<TResult>(condition: (item: T) => T2): ICollection<TResult>`.

Projects each element of a collection to an `Array<T>` and flattens the resulting collection into one collection

```typescript
const cats = [
    {
        name: 'Feya',
        kittens: ['Lory', 'Pussy']
    },
    {
        name: 'Cherry',
        kittens: ['Browny', 'Tommy']
    }
];

const allKittens = _(cats).selectMany(item => item.kittens).toArray();

console.log(allKittens); // [ 'Lory', 'Pussy', 'Browny', 'Tommy' ]
```

## skip

Method signature: `skip(shouldSkip: number) : ICollection<T>`.

Bypasses `shouldSkip` elements in a collection and then returns the remaining elements.

```typescript
const skipped = _([1, 2, 3, 4, 5]).skip(3).toArray();

console.log(skipped); // [ 4, 5 ]
```

## sort

Method signature: `sort(): ICollection<T>`.

Sorts items ascending using default comparison

```typescript
const sorted = _([4, 1, 3, 2]).sort().toArray();

console.log(sorted); // [ 1, 2, 3, 4 ]
```

## sortDescending

Method signature: `sortDescending(): ICollection<T>`.

Sorts items descending using default comparison

```typescript
const sorted = _([4, 1, 3, 2]).sortDescending().toArray();

console.log(sorted); // [ 4, 3, 2, 1 ]
```

## take

Method signature: `skip(shouldSkip: number) : ICollection<T>`.

Returns a `shouldTake` elements from the start of a collection.

```typescript
const taked = _([1, 2, 3, 4, 5]).take(3).toArray();

console.log(taked); // [ 1, 2, 3 ]
```

## where

Method signature: `where(predicate: (item: T, index?: number) => boolean) : ICollection<T>`.

Filters a sequence of values based on a predicate.

```typescript
const sorted = _([4, 1, 3, 2]).where(item => item % 2).toArray();

console.log(sorted); // [ 1, 3 ]
```
