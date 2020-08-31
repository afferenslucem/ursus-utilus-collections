# Declarray

Simple library with useful utils for data manipulation

## Menu

* [Examples](#examples)
* [Setup](#setup)
* [Technologies](#technologies)

## Examples

### Pay attention

> ⚠️ Do not change returned array if u want to reuse owned collection

### Importing

```typescript
import _ from 'declarray'
```

### Filtering

```typescript
const expected = [2, 4];
const result = _([1, 2, 3, 4]).where(item => !(item % 2)).toArray();

assert.deepEqual(expected, result);
```

### Mapping

```typescript
const expected = ['2', '4', '6', '8'];
const result = _([1, 2, 3, 4]).select(item => (item * 2).toString()).toArray();

assert.deepEqual(expected, result);
```

### Skipping

```typescript
const expected = [4, 5, 6];
const result = _([1, 2, 3, 4, 5, 6]).skip(3).toArray();

assert.deepEqual(expected, result);
```

### Taking

```typescript
const expected = [1, 2, 3];
const result = _([1, 2, 3, 4, 5, 6]).take(3).toArray();

assert.deepEqual(expected, result);
```

### Find first

```typescript
const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  
const first = collection.first(); // returns 1
assert.equal(first, 1, 'Return wrong first value');
  
const firstByCondition = collection.first(item => item > 10); // returns 11
assert.equal(firstByCondition, 11, 'Return wrong first filtered value');
  
assert.throws(() => {
    collection.first(item => item > 12); // throws error
}, 'No matches found');
```

### Find first or return default

```typescript
const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const first = collection.firstOrDefault(); // returns 1
assert.equal(first, 1, 'Return wrong first value');

const firstByCondition = collection.firstOrDefault(item => item > 10); // returns 11
assert.equal(firstByCondition, 11, 'Return wrong first filtered value');

const emptyFirst = collection.firstOrDefault(item => item > 12); // returns null
assert.equal(emptyFirst, null, 'Return wrong default value');

const defaultFirst = collection.firstOrDefault(item => item > 12, 0); // returns null
assert.equal(defaultFirst, 0, 'Return wrong overrided default value');
```

### Find last

```typescript
const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const last = collection.last(); // returns 12
assert.equal(last, 12, 'Return wrong last value');

const lastByCondition = collection.last(item => item < 3); // returns 2
assert.equal(lastByCondition, 2, 'Return wrong last filtered value');
  
assert.throws(() => {
    collection.last(item => item < 1); // throws error
}, 'No matches found');
```

### Find last or return default

```typescript
const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const last = collection.lastOrDefault(); // returns 12
assert.equal(last, 12, 'Return wrong last value');

const lastByCondition = collection.lastOrDefault(item => item < 3); // returns 2
assert.equal(lastByCondition, 2, 'Return wrong last filtered value');

const emptylast = collection.lastOrDefault(item => item < 1); // returns null
assert.equal(emptylast, null, 'Return wrong default');

const defaultlast = collection.lastOrDefault(item => item < 1, 0); // returns null
assert.equal(defaultlast, 0, 'Return wrong overrided default');
```

### Sorting

#### Default sorting

```typescript
const collection = _([3, 2, 1]);

const sorted = collection.sort().toArray();

assert.deepEqual(sorted, [1, 2, 3])
```

#### Sorting desc

```typescript
const collection = _([1, 2, 3]);

const sorted = collection.sortDescending().toArray();

assert.deepEqual(sorted, [3, 2, 1])
```

#### Sorting by field

```typescript
const collection = _([[3, 4], [2, 11], [2, 3], [1, 2]]);

const sorted = collection.orderBy(item => item[0]).toArray();

assert.deepEqual(sorted, [[1, 2], [2, 11], [2, 3], [3, 4]])
```

#### Sorting by field desc

```typescript
const collection = _([[3, 4], [2, 11], [2, 3], [1, 2]]);

const sorted = collection.orderByDescending(item => item[0]).toArray();

assert.deepEqual(sorted, [[1, 2], [2, 11], [2, 3], [3, 4]])
```

#### Sorting by many fields

```typescript
const collection = _([[3, 4], [2, 11], [2, 3], [1, 2]]);

const sorted = collection.orderBy(item => item[0]).thenBy(item => item[1]).toArray();

assert.deepEqual(sorted, [[1, 2], [2, 3], [2, 11], [3, 4]])
```

#### Sorting by many fields desc

```typescript
const collection = _([[3, 4], [2, 11], [2, 3], [1, 2]]);

const sorted = collection.orderByDescending(item => item[0]).thenByDescending(item => item[1]).toArray();

assert.deepEqual(sorted, [[1, 2], [2, 3], [2, 11], [3, 4]])
```

### Grouping

#### Simple grouping

```typescript
const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

const expected = _([{
    key: 1,
    group: _([[1, 2]])
},
{
    key: 2,
    group: _([[2, 3], [2, 4]])
},
{
    key: 3,
    group: _([[3, 4]])
}]);

const grouped = collection.groupBy(item => item[0]);

assert.deepEqual(grouped, expected)
```

#### Grouping with group manipulations

```typescript
const collection = _([[1, 2], [2, 3], [2, 4], [3, 4]]);

const expected: ICollection<IGroupedData<number, number[]>> = _([{
    key: 1,
    group: [1, 2]
},
{
    key: 2,
    group: [2, 3]
},
{
    key: 3,
    group: [3, 4]
}]);

const grouped = collection.groupBy(item => item[0], group => group.first());

assert.deepEqual(grouped, expected);
```

### Min & Max

#### Min

```typescript
const collection = _([4, 3, 6, 9, 7, 1, 8]);

const expected = 1;

const result = collection.min();

assert.deepEqual(result, expected)
```

#### Max

```typescript
const collection = _([4, 3, 6, 9, 7, 1, 8]);

const expected = 9;

const result = collection.max();

assert.deepEqual(result, expected)
```

### Exists

```typescript
const collection = u.range(1, 9);

const expected = true;

const result = collection.exists(item => (item % 7) == 0);

assert.equal(result, expected)
```

### Sum

```typescript
const collection = u.range(1, 9);

const expected = 45;

const result = collection.sum();

assert.equal(result, expected)
```

#### Sum other types

```
const collection = _(['1', '2', '3',]);

const expected = '6';

const result = collection.sum((a, b) => Number(a) + Number(b));

assert.equal(result, expected)
```

### Reverse

```typescript
const collection = _([1, 2, 3]);

const expected = [3, 2, 1];

const result = collection.reverse().toArray();

assert.deepEqual(result, expected)
```

### Distinct

```typescript
const collection = _([1, 1, 2, 1, 3, 2, 3]);

const expected = [1, 2, 3];

const result = collection.distinct().toArray();

assert.deepEqual(result, expected)
```

#### Distinct by

```typescript
const collection = _([[1, 1], [2, 1], [3, 2]]);

const expected = [[1, 1], [3, 2]];

const result = collection.distinct(item => item[1]).toArray();

assert.deepEqual(result, expected)
```

### Concat

```typescript
const collection = _([1, 2]);

const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = collection.concat([3, 4]).concat(u([5, 6, 7])).concat([8, 9]).toArray();

assert.deepEqual(result, expected)
```

### Count

```typescript
const result = _([8, 5, 4, 2, 9, 1, 4]).count();
const expected = 7;

assert.deepEqual(result, expected);
```

#### By condition

```typescript
const result = _([8, 5, 4, 2, 9, 1, 4]).count(item => (item % 2) == 0);
const expected = 4;

assert.deepEqual(result, expected);
```

### Aggregate

Sum by aggregate

```typescript
const collection = u.range(1, 9);
const expected = 45;
const result = collection.sum();
assert.equal(result, expected)
```

Aggregation collection to object

```typescript
const collection = _([
    { name: 'first', value: 1 },
    { name: 'second', value: 2 },
    { name: 'third', value: 3 },
]);
const expected = {
    'first': 1,
    'second': 2,
    'third': 3
};
const result = collection.aggregate((acc, item) => {
    acc[item.name] = item.value
    return acc;
}, {});
assert.deepEqual(result, expected)
```

### Range

```typescript
const collection = u.range(0, 5);

const expected = _([0, 1, 2, 3, 4, 5]);

assert.deepEqual(collection, expected)
```

#### Generating with step

```typescript
const collection = u.range(0, 6, 2);

const expected = _([0, 2, 4, 6]);

assert.deepEqual(collection, expected)
```

## Setup

```bash
$npm install declarray
```

## Technologies

Project is created with:

* benchmark 2.1.4
* chai 4.2.0
* mocha 8.1.0
* ts-mocha 7.0.0
* ts-node 8.10.2
* typescript 3.9.7
