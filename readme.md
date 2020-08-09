# Ursus-Utilus-Logger

Simple library with useful utils for data manipulation

## Menu

* [Technologies](#technologies)
* [Examples](#examples)
* [Setup](#setup)

## Technologies

Project is created with:

* typescript 3.9.7
* chai 4.2.0
* mocha 8.1.0
* ts-mocha 7.0.0
* tsc 1.20150623.0

## Examples

##### Pay attention

> ⚠️ Method toArray returns freezed array

### Filtering

``````typescript
import _ from 'ursus-utilus-collections';

const expected = [2, 4];
const result = _([1, 2, 3, 4]).where(item => !(item % 2)).toArray();

assert.deepEqual(expected, result);
``````

### Mapping

``````typescript
import _ from 'ursus-utilus-collections';

const expected = ['2', '4', '6', '8'];
const result = _([1, 2, 3, 4]).select(item => (item * 2).toString()).toArray();

assert.deepEqual(expected, result);
``````

### Skipping

```typescript
import _ from 'ursus-utilus-collections'

const expected = [4, 5, 6];
const result = _([1, 2, 3, 4, 5, 6]).skip(3).toArray();

assert.deepEqual(expected, result);
```

### Taking

```typescript
import _ from 'ursus-utilus-collections'

const expected = [1, 2, 3];
const result = _([1, 2, 3, 4, 5, 6]).take(3).toArray();

assert.deepEqual(expected, result);
```

### Find first

```typescript
import _ from 'ursus-utilus-collections'
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
import _ from 'ursus-utilus-collections';

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
import _ from 'ursus-utilus-collections';

const collection = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const last = collection.last(); // returns 12
assert.equal(last, 12, 'Return wrong last value');

const lastByCondition = collection.last(item => item < 3); // returns 2
assert.equal(lastByCondition, 2, 'Return wrong last filtered value');
  
assert.throws(() => {
    collection.last(item => item < 1); // throws error
}, 'No matches found');
```

### Find first or return default

```typescript
import _ from 'ursus-utilus-collections';

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

## Setup

``````bash
$npm install ursus-utilus-collections
``````
