# Joining Methods

* [concat](#concat)
* [join](#join)
* [zip](#zip)

## concat

Method signature: `concat(items: T[] | ICollection<T>): ICollection<T>`.

Concatenates two sequences.

```typescript
const concated = _([1, 2, 3).concat([4, 5, 6]).toArray();

console.log(concated); // [ 1, 2, 3, 4, 5, 6 ]
```

## join

Method signature: `join<T2, TKey, TResult>(iterable: ICollection<T2> | T2[], firstKey: (item: T1) => TKey, secondKey: (item: T2) => TKey, zipFunc: (first: T1, second: T2) => TResult)`

Correlates the elements of two collections based on matching keys.

```typescript
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

const ages = [{
    years: 1,
    name: "Young"
},{
    years: 4,
    name: "Middle"
},{
    years: 9,
    name: "Old"
}]

const joined = _(cats).join(
    ages,
    cat => cat.age,
    age => age.years,
    (cat, age) => ({name: cat.name, age: age.name})
).toArray();

console.log(joined);
// [
//     {name: 'Barsik', age: 'Old'},
//     {name: 'Cherry', age: 'Middle'},
//     {name: 'Feya', age: 'Middle'},
//     {name: 'Lulya', age: 'Young'},
// ]
```

* [union](#union)

## union

Method signature: `union(items: T[] | ICollection<T>): ICollection<T>`.

Produces the set union of two collections by using the default equality comparer.

```typescript
const union = _([0, 1, 2, 3]).union([2, 3, 4, 4, 5, 6]).toArray();

console.log(union) // [0, 1, 2, 3, 4, 5, 6];
```

### union with custom comparer

Method signature: `union(items: T[] | ICollection<T>, comparer: EqualityCondition<T>): ICollection<T>`.

Produces the set union of two collections by using the specified equality comparer.

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
    name: 'Lulya',
    age: 2
}]
const cats2 = [{
    name: 'Feya',
    age: 3
},
{
    name: 'Cherry',
    age: 2
}]

const union = _(cats).union(cats2, (a, b) => a.age === b.age).toArray();
// getiing unnion cats by age

console.log(union)
// [ { name: 'Tom', age: 1 }, { name: 'Bonny', age: 3 }, { name: 'Lulya', age: 2 } ]
```

## zip

Method signature: `zip<T2>(iterable: ICollection<T2> | T2[]): ICollection<[T, T2]>`.

Returns new collection with converted corresponding elements to tuples.

```typescript
const zipped = _([1, 2, 3).zip([4, 5, 6]).toArray();

console.log(zipped); // [ [1, 4], [2, 5], [3, 6] ]
```

### zip with function

Method signature: `zip<T2, TResult>(iterable: ICollection<T2> | T2[], zipFunc: (first: T1, second: T2) => TResult): ICollection<TResult>`.

Applies a specified function to the corresponding elements of two collections, producing a collection of the results.

```typescript
const zipped = _([1, 2, 3).zip([4, 5, 6], (a, b) => a + b).toArray();

console.log(zipped); // [ 5, 7, 9 ]
```