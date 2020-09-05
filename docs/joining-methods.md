# Joining Methods

* [concat](#concat)
* [zip](#zip)

## concat

Method signature: `concat(items: T[] | ICollection<T>): ICollection<T>`.

Concatenates two sequences.

```typescript
const concated = _([1, 2, 3).concat([4, 5, 6]).toArray();

console.log(concated); // [ 1, 2, 3, 4, 5, 6 ]
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
