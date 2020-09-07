# Aggregation Methods

Aggregating methods trigger computation of your query. All your chain of methods will be runned for taking result.

* [aggregate](#aggregate)
* [all](#all)
* [any](#any)
* [average](#average)
* [contains](#contains)
* [count](#count)
* [countWhile](#countWhile)
* [elementAt](#elementAt)
* [elementAtOrDefault](#elementAtOrDefault)
* [first](#first)
* [firstOrDefault](#firstOrDefault)
* [last](#last)
* [lastOrDefault](#lastOrDefault)
* [max](#max)
* [min](#min)
* [sum](#sum)

## aggregate

Method signature: `aggregate(accumulatorFunc: (first: T, second: T) => T): T`.

Applies an accumulator function over a collection skipping first value and this value using like accumulator.

```typescript
const result = _([1, 2, 3]).aggregate((a, b) => a + b)

console.log(result); // 6
```

### With accumulator

Method signature: `aggregate(accumulatorFunc: (first: T, second: T) => T, accumulator: T): T`.

Applies an accumulator function over a collection with initialized accumulator value.

```typescript
const result = _([1, 2, 3]).aggregate((acc, item) => acc + item, 10)

console.log(result); // 16
```

### With accumulator of external type

Method signature: `aggregate<TResult>(accumulatorFunc: ReduceWithAccumulatorCondition<T, TResult>, accumulator: TResult): TResult`.

Applies an accumulator function over a collection with initialized accumulator value.

```typescript
const result = _([1, 2, 3]).aggregate((acc, item) => acc + item, '0')

console.log(result); // '0123'
```

## all

Method signature: `all(condition: ((item: T, index?: number) => boolean): T`.

Determines whether all elements of a sequence satisfy a condition.

```typescript
const result = _([1, 3, 1, 4, 2, 4, 1]).all(item => !!(item % 2)) // Check for even
console.log(result); // false

const resultTruthly = _([1, 3, 1, 5, 3, 5, 1]).all(item => !!(item % 2)) // Check for even
console.log(resultTruthly); // true
```

## any

Method signature: `any(condition: ((item: T, index?: number) => boolean): T`.

Determines whether any element of a sequence satisfies a condition.

```typescript
const result = _([1, 3, 1, 4, 2, 4, 1]).any(item => item > 3)
console.log(result); // true

const resultFalsy = _([1, 3, 1, 4, 2, 4, 1]).any(item => item > 5)
console.log(resultFalsy); // false
```

## average

Method signature: `average(): number`.

Computes the average of a collection of numeric values.

```typescript
const result = _([1, 2, 3, 4, 5]).average()

console.log(result); // 3
```

### avarege for field of objects

Method signature: `average(map: (item: T) => number): number`.

Computes the average of numeric property on items of a collection.

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

Determines whether a collection contains a specified element. Using default equality condition.

```typescript
const result = _([1, 2, 3, 4, 5]).contains(3)
console.log(result); //true

const resultFalsy = _([1, 2, 3, 4, 5]).contains(9)
console.log(result); //false
```

## contains with equality comparer

Method signature: `contains(element: T, (first: T, second: T) => boolean): boolean`.

Determines whether a collection contains a specified element. Using custom equality condition.

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

const cat = {
    name: 'Feya',
    age: 9
}

const result = _(cats).contains(cat, (a, b) => a.name == b.name);

console.log(result); // true
```

## count

Method signature: `count(): number;`.

Returns the number of elements in a collection.

```typescript
const result = _([1, 2, 3, 4, 5]).count()
console.log(result); // 5
```

### Count for condition

Method signature: `count(condition: (item: T, index?: number) => boolean): number;`.

Returns the number of elements passed codition.

```typescript
const result = _([1, 2, 3, 4, 5]).count(item => (item % 2)) // Counting odd items
console.log(result); // 3
```

## countWhile

Method signature: `countWhile(condition: (item: T, index?: number) => boolean): number;`.

Returns count of elements from a collection as long as a specified condition is true.

```typescript
const result = _([1, 2, 3, 2, 1]).countWhile(item => item < 3)
console.log(result); // 2
```

## elementAt

Method signature: `elementAt(position: number): T`.

Returns element at specified index at collection.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAt(3)

console.log(el); // 4
```

> ⚠️ If collection hasn't got element at specified index - method throws '**No matches found**'

## elementAtOrDefault

Method signature: `elementAtOrDefault(position: number): T | null`.

Returns element at specified index at collection. If collection hasn't got matching element returns null.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10)

console.log(el); // null
```

### elementAtOrDefault with custon default

Method signature: `elementAtOrDefault(position: number, $default: T): T`.

Returns element at specified index at collection. If collection hasn't got matching element returns specified default

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10, 0)

console.log(el); // 0
```

## first

Method signature: `first(): T`.

Returns first element at collection.

```typescript
const first = _([1, 3, 7, 3, 2, 4, 7, 8]).first();

console.log(first); // 1
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

### first for condition

Method signature: `first(condition: (item: T, index?: number) => boolean): T`.

Returns first element of collection passed the condition.

```typescript
const firstByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).first(item => item > 3);

console.log(firstByCondition); // 7
```

## firstOrDefault

Method signature: `firstOrDefault(): T | null`.

Works like `first`, but doesn't throw exception, it returns null like default result.

```typescript
const first = _([]).firstOrDefault();

console.log(first); // null
```

### firstOrDefault with custom default value

Method signature: `firstOrDefault($default: T): T`.

Returns first element in collection or specified $default.

```typescript
const firstWithDefault = _([]).firstOrDefault(0);

console.log(firstWithDefault); // 0
```

### firstOrDefault with condition

Method signature: `firstOrDefault($default: T | null, condition: FilterCondition<T>): T | null`.

Returns first element in collection passed the condition.

```typescript
const firstWithDefault = _([3, 4, 6, 3, 2 ,5]).firstOrDefault(0, item => item > 777);

console.log(firstWithDefault); // 0
```

## last

Method signature: `last(): T`.

Returns last element at collection.

```typescript
const last = _([1, 3, 7, 3, 2, 4, 7, 8]).last();

console.log(last); // 8
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

### last with condition

Method signature: `last(condition: (item: T, index?: number) => boolean): T`.

Returns last element of collection passed the condition.

```typescript
const lastByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).last(item => item < 3);

console.log(lastByCondition); // 2
```

### lastOrDefault

Method signature: `lastOrDefault(): T | null`.

Returns last element in collection or null.

```typescript
const last = _([]).lastOrDefault();

console.log(last); // null
```

### lastOrDefault with custom default value

Method signature: `lastOrDefault($default?: T): T`.

Returns last element in collection or specified $default.

```typescript
const lastWithDefault = _([]).lastOrDefault(0);

console.log(lastWithDefault); // 0
```

### lastOrDefault with condition

Returns last element in collection passed the condition

```typescript
const lastWithDefault = _([3, 4, 6, 3, 2 ,5]).lastOrDefault(0, item => item < 0);

console.log(lastWithDefault); // 0
```

## max

Method signature: `max(): T`.

Returns maximum value in collection. Will using default comparing like rule.

```typescript
const el = _([1, 3, 1, 4, 2, 4, 1]).max()

console.log(el); // 4
```

### max with condition

Method signature: `max(predicate: (first: T, second: T) => number): T`.
Returns maximum value in collection by compare rule.

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

Method signature: `min(): T`.

Returns minimum value in collection.

```typescript
const el = _([1, 3, 1, 4, 2, 4, 1]).min()

console.log(el); // 1
```

### min with condition

Method signature: `min(predicate: (first: T, second: T) => number): T`.
Returns minimum value in collection by compare rule.

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

## single

Method signature: `single(): T`.

Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.

```typescript
const result = _([1]).single()

console.log(result); // 1

const anoserResult = _([1, 2, 3]).single()

// Fired new Error('Elements count greater then 1.');
```

## sum

Method signature: `sum(): number`.

Computes the sum of a collection of numeric values.

```typescript
const result = _([1, 2, 3, 4, 5]).sum()

console.log(result); // 15
```

### sum for field of objects

Method signature: `sum(map: (item: T) => number): number`.

Computes the sum of a collection of numeric values.

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

const result = _(cats).sum(item => item.age) // Computing sum of ages of cats

console.log(result); // 6
```
