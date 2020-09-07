# Materializing Methods

* [empty](#empty)
* [of](#of)
* [random](#random)
* [range](#range)
* [repeat](#rarepeatnge)

## empty

Method signature: `empty<T> (): ICollection<T>`.

Creates empty collection

```typescript
const empty = _.empty<number>().toArray();

console.log(empty); // []
```

## of

Method signature: `of<T>(obj: T) : ICollection<T>`.

Creates a collection that contains specified value.

```typescript
const collection = _.of(3).toArray();

console.log(collection); // [ 0, 4, 4, 3, 1 ]
```

## random

Method signature: `random (length: number, max = 10e10): ICollection<number>`.

Generates a collection of random numbers with a specified length.

```typescript
const random = _.random(3, 5).toArray();

console.log(random); // [ 0, 4, 4, 3, 1 ]
```

## range

Method signature: `range(from: number, to: number, step = 1) : ICollection<number>`.

Generates a collection of integral numbers within a specified range.

```typescript
const range = _.range(0, 4);

console.log(range); // [ 0, 1, 2, 3, 4 ]
```

### range with step

Generates a collection of integral numbers within a specified range with specified step.

```typescript
const range = _.range(0, 9, 3);

console.log(range); // [ 0, 3, 6, 9 ]
```

## repeat

Method signature: `random (length: number, max = 10e10): ICollection<number>`.

Generates a collection of random numbers with a specified length.

```typescript
const repeat = _.repeat(3, 5).toArray();

console.log(repeat); // [ 3, 3, 3, 3, 3 ]
```
