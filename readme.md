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

## Setup

``````bash
$npm install ursus-utilus-collections
``````
