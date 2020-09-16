# Querring Methods

* [append](#append)
* [defaultIfEmpty](#defaultIfEmpty)
* [distinct](#distinct)
* [groupBy](#groupBy)
* [orderBy](#orderBy)
* [orderByDescending](#orderByDescending)
* [prepend](#prepend)
* [reverse](#reverse)
* [select](#select)
* [selectMany](#selectMany)
* [skip](#skip)
* [skipWhile](#skipWhile)
* [sort](#sort)
* [sortDescending](#sortDescending)
* [take](#take)
* [takeWhile](#takeWhile)
* [where](#where)

## append

Method signature: `append(item: T): ISequence<T>`.

Appends a value to the end of the sequence.

```typescript
const appended = _([1, 2, 3]).append(4).toArray();

console.log(appended); // [1, 2, 3, 4]
```

## defaultIfEmpty

Method signature: `defaultIfEmpty(value: T | T[] | ISequence<T>): ISequence<T>`.

Returns the elements of the sequence or the specified value in a sequence if the original sequence is empty.

```typescript
const defaultValue = _([1, 2, 3, 4, 5]).where(item => item > 7).defaultIfEmpty(0).toArray();

console.log(defaultValue); // [ 0 ]
```

## distinct

Method signature: `distinct(): ISequence<T>`.

Returns distinct elements from a sequence using default equality comparer

```typescript
const distinct = _([1, 3, 2, 2, 3, 1, 1, 2]).distinct().toArray();

console.log(distinct); // [ 1, 3, 2 ]
```

### distinct with custom comparer

Method signature: `distinct<V>(comparer: (first: T, second: T) => boolean): ISequence<T>`.

Returns distinct elements from a sequence using specified equality comparer

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

const distinct = _(cats).distinct((first, second) => first.age === second.age).toArray();
// getiing cats distinct by age

console.log(distinct)
// [ { name: 'Tom', age: 1 }, { name: 'Bonny', age: 3 }, { name: 'Feya', age: 2 } ]
```

## groupBy

Method signature: `groupBy<TKey>(key: (item: T) => TKey): ISequence< IGroupedData<TKey, ISequence<T>> >`.

Groups the elements of a sequence.

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

Method signature: `groupBy<TKey, TValue>(key: (item: T) => TKey, groupMap: (item: ISequence<T>) => TValue>): ISequence<IGroupedData<TKey, TValue>>`.

Groups the elements of a sequence and aggregates it.

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

Method signature: `orderBy<TKey>(key: (item: T) => TKey): ISortingsequence<T>`.

Sorts the elements of a sequence in ascending order to a key.

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

Method signature: `orderBy<TKey>(key: (item: T) => TKey): ISortingsequence<T>`.

Sorts the elements of a sequence in descending order to a key.

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

## prepend

Method signature: `prepend(item: T): ISequence<T>`.

Adds a value to the beginning of the sequence.

```typescript
const prepended = _([1, 2, 3]).prepend(0).toArray();

console.log(prepended); // [0, 1, 2, 3]
```

## reverse

Method signature: `reverse(): ISequence<T>`.

```typescript
const reverced = _([1, 2, 3, 4, 5]).reverse().toArray();

console.log(reverced); // [ 5, 4, 3, 2, 1 ]
```

## select

Method signature: `select<TResult>(condition: (item: T) => T2): ISequence<TResult>`.

Converts each element of a sequence into a new form.

```typescript
const selected = _([1, 2, 3, 4, 5]).select(item => item ** 2).toArray();

console.log(selected); // [ 1, 4, 9, 16, 25 ]
```

## selectMany

Method signature: `select<TResult>(condition: (item: T) => T2): ISequence<TResult>`.

Projects each element of a sequence to an `Array<T>` and flattens the resulting sequence into one sequence

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

Method signature: `skip(shouldSkip: number) : ISequence<T>`.

Bypasses `shouldSkip` elements in a sequence and then returns the remaining elements.

```typescript
const skipped = _([1, 2, 3, 4, 5]).skip(3).toArray();

console.log(skipped); // [ 4, 5 ]
```

## skipLast

Method signature: `skipLast(shouldSkip: number) : ISequence<T>`.

Returns a new sequence that contains the elements from source with the last `shouldSkip` elements of the source sequence omitted.

```typescript
const skipped = _([1, 2, 3, 4, 5]).skipLast(3).toArray();

console.log(skipped); // [ 1, 2 ]
```

## skipWhile

Method signature: `skipWhile(shouldSkipCondition: (item: T, index?: number) => boolean): ISequence<T>`.

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.

```typescript
const skipped = _([1, 2, 3, 2, 1]).skipWhile(item => item < 3).toArray();

console.log(skipped); // [ 3, 2, 1 ]
```

## sort

Method signature: `sort(): ISequence<T>`.

Sorts items ascending using default comparison

```typescript
const sorted = _([4, 1, 3, 2]).sort().toArray();

console.log(sorted); // [ 1, 2, 3, 4 ]
```

## sortDescending

Method signature: `sortDescending(): ISequence<T>`.

Sorts items descending using default comparison

```typescript
const sorted = _([4, 1, 3, 2]).sortDescending().toArray();

console.log(sorted); // [ 4, 3, 2, 1 ]
```

## take

Method signature: `take(shouldTake: number) : ISequence<T>`.

Returns a `shouldTake` elements from the start of a sequence.

```typescript
const taked = _([1, 2, 3, 4, 5]).take(3).toArray();

console.log(taked); // [ 1, 2, 3 ]
```

## takeLast

Method signature: `takeLast(shouldTake: number) : ISequence<T>`.

Returns a new sequence that contains the last `shouldTake` elements from source.

```typescript
const taked = _([1, 2, 3, 4, 5]).takeLast(3).toArray();

console.log(taked); // [ 3, 4, 5 ]
```

## takeWhile

Method signature: `takeWhile(shouldSkipCondition: (item: T, index?: number) => boolean): ISequence<T>`.

Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.

```typescript
const taken = _([1, 2, 3, 2, 1]).takeWhile(item => item < 3).toArray();

console.log(skipped); // [ 1, 2 ]
```

## where

Method signature: `where(predicate: (item: T, index?: number) => boolean) : ISequence<T>`.

Filters a sequence of values based on a predicate.

```typescript
const sorted = _([4, 1, 3, 2]).where(item => item % 2).toArray();

console.log(sorted); // [ 1, 3 ]
```
