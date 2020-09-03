# Aggregation Methods

* [aggregate](#aggregate)
* [all](#all)
* [any](#any)
* [average](#average)
* [contains](#contains)
* [count](#count)
* [elementAt](#elementAt)
* [first](#first)
* [last](#last)
* [max](#max)
* [min](#min)
* [sum](#sum)

## aggregate

Method signature: `aggregate(predicate: (first: T, second: T) => T, accumulator?: T): T`.

### With accumulator

Applies an accumulator function over a sequence with initialized accumulator value.

```typescript
const result = _([1, 2, 3]).aggregate((acc, item) => acc + item, 10)

console.log(result); // 16
```

### Without accumulator

Applies an accumulator function over a sequence skipping first value and this value using like accumulator.

```typescript
const result = _([1, 2, 3]).aggregate((acc, item) => acc + item)

console.log(result); // 6
```

### With accumulator of external type

Method signature: `aggregate(predicate: (acc: V, second: T) => V, accumulator?: T): T`.

Applies an accumulator function over a sequence with initialized accumulator value.

```typescript
const result = _([1, 2, 3]).aggregate((acc, item) => acc + item, '0')

console.log(result); // '0123'
```

## all

Method signature: `all(predicate: ((item: T, index?: number) => boolean): T`.

Determines whether all elements of a sequence satisfy a condition.

```typescript
const result = _([1, 3, 1, 4, 2, 4, 1]).all(item => !!(item % 2)) // Check for even
console.log(result); // false

const resultTruthly = _([1, 3, 1, 5, 3, 5, 1]).all(item => !!(item % 2)) // Check for even
console.log(resultTruthly); // true
```

## any

Method signature: `any(predicate: ((item: T, index?: number) => boolean): T`.

Determines whether any element of a sequence satisfies a condition.

```typescript
const result = _([1, 3, 1, 4, 2, 4, 1]).any(item => item > 3)
console.log(result); // true

const resultFalsy = _([1, 3, 1, 4, 2, 4, 1]).any(item => item > 5)
console.log(resultFalsy); // false
```

## average

Method signature: `average(map?: (item: T) => number): number`.

Computes the average of a collection of numeric values.

```typescript
const result = _([1, 2, 3, 4, 5]).average()

console.log(result); // 3
```

### For field of objects

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
}]

const result = _(cats).average(item => item.age) // Computing middle age of cats

console.log(result); // 2
```

## contains

Method signature: `contains(element: T): boolean`.

Determines whether a collection contains a specified element.

```typescript
const result = _([1, 2, 3, 4, 5]).contains(3)
console.log(result); //true

const resultFalsy = _([1, 2, 3, 4, 5]).contains(9)
console.log(result); //false
```

## count

Method signature: `count(predicate?: (item: T, index?: number) => boolean): number;`.

Returns the number of elements in a collection.

```typescript
const result = _([1, 2, 3, 4, 5]).count()
console.log(result); // 5
```

### Count for condition

```typescript
const result = _([1, 2, 3, 4, 5]).count(item => (item % 2)) // Counting odd items
console.log(result); // 3
```

## elementAt

Method signature: `elementAt(position: number): T`.

Returns element at specified index at collection.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAt(3)

console.log(el); // 4
```

> ⚠️ If collection hasn't got element at specified index - method throws '**No matches found**'

### elementAtOrDefault

Method signature: `elementAtOrDefault(position: number, $default?: T): T | null`.

Works like `elementAt`, but doesn't throw exception, it returns null like default result.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10)

console.log(el); // null
```

Default result can be overrided:

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10, 0)

console.log(el); // 0
```

## first

Method signature: `first(predicate?: (item: T, index?: number) => boolean): T`.

Returns first element at collection.

```typescript
const first = _([1, 3, 7, 3, 2, 4, 7, 8]).first();

console.log(first); // 1
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

Can be used with condition:

```typescript
const firstByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).first(item => item > 3);

console.log(firstByCondition); // 7
```

### firstOrDefault

Method signature: `firstOrDefault($default?: T | null, predicate?: (item: T, index?: number) => boolean): T | null`.

Works like `first`, but doesn't throw exception, it returns null like default result.

```typescript
const first = _([]).firstOrDefault();

console.log(first); // null
```

Default result can be overrided:

```typescript
const firstWithDefault = _([]).firstOrDefault(0);

console.log(firstWithDefault); // 0
```

You can use this method with condition too:

```typescript
const firstWithDefault = _([3, 4, 6, 3, 2 ,5]).firstOrDefault(0, item => item > 777);

console.log(firstWithDefault); // 0
```

## last

Method signature: `last(predicate?: (item: T, index?: number) => boolean): T`.

Returns last element at collection.

```typescript
const last = _([1, 3, 7, 3, 2, 4, 7, 8]).last();

console.log(last); // 8
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

Can be used with condition:

```typescript
const lastByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).last(item => item < 3);

console.log(lastByCondition); // 2
```

### lastOrDefault

Method signature: `lastOrDefault($default?: T | null, predicate?: (item: T, index?: number) => boolean): T | null`.

Works like `last`, but doesn't throw exception, it returns null like default result.

```typescript
const last = _([]).lastOrDefault();

console.log(last); // null
```

Default result can be overrided:

```typescript
const lastWithDefault = _([]).lastOrDefault(0);

console.log(lastWithDefault); // 0
```

You can use this method with condition too:

```typescript
const lastWithDefault = _([3, 4, 6, 3, 2 ,5]).lastOrDefault(0, item => item < 0);

console.log(lastWithDefault); // 0
```

## max

Method signature: `max(predicate?: (first: T, second: T) => number | undefined): T`.

Returns maximum value in collection.

```typescript
const el = _([1, 3, 1, 4, 2, 4, 1]).max()

console.log(el); // 4
```

You can use this method for non numeric objects, but you should specify compare function:

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
}]

const el = _(cats).max((a, b) => a.age - b.age) // Find cat with maximum age

console.log(el); // { name: 'Bonny', age: 3 }
```

## min

Method signature: `min(predicate?: (first: T, second: T) => number | undefined): T`.

Returns minimum value in collection.

```typescript
const el = _([1, 3, 1, 4, 2, 4, 1]).min()

console.log(el); // 1
```

You can use this method for non numeric objects, but you should specify compare function:

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
}]

const el = _(cats).min((a, b) => a.age - b.age) // Find cat with minimum age

console.log(el); // { name: 'Tom', age: 1 }
```

## sum

Method signature: `average(map?: (item: T) => number): number`.

Computes the average of a collection of numeric values.

```typescript
const result = _([1, 2, 3, 4, 5]).average()

console.log(result); // 3
```

### For field of objects

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
}]

const result = _(cats).average(item => item.age) // Computing middle age of cats

console.log(result); // 2
```