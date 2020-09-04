# Queries Methods

* [distinct](#distinct)
* [groupBy](#groupBy)

## distinct

Method signature: `distinct(): ICollection<T>`.

Returns distinct elements from a collection.

```typescript
const distinct = _([1, 3, 2, 2, 3, 1, 1, 2]).distinct().toArray();

console.log(distinct); // [ 1, 3, 2 ]
```

### Distinct by field

Method signature: `distinct<V>(mapping: (item: T) => V): ICollection<T>`.

Returns distinct elements by field from a collection

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
// { key: 1, group: _([{name: Tom, age: 1}]) },
// { key: 2, group: _([{name: Feya, age: 2}, {name: Cherry, age: 2}]) },
//]
```

### grouping with mapping result

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
// { key: 1, group: 1 },
// { key: 2, group:2 },
//]
```
