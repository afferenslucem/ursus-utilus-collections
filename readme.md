# Declarray

## What is Declarray?

**Declarray** is my own linq like library for manipulations with collections. I did it just for improve my skills at my free time.
This lib allows filter, sort, change and etc. collection in declarative style.
Declarray supports lazy computations. Your expression will computed once and only when you will call method [Materializing Methods](https://github.com/afferenslucem/declarray/wiki/Materializing-Methods) or one of [Aggregating Methods](https://github.com/afferenslucem/declarray/wiki/Aggregating-Methods).

## Installation

```bash
$npm install declarray
```

## Usage

```typescript
import _ from 'declarray'
...
const result = _([1, 2, 3, 4]).where(item => !(item % 2)).toArray();
// result is [2, 4]

const anotherResult = _([1, 2, 3, 4]).select(item => item ** 2).toArray();
// [1, 4, 9, 16]
```

## Wiki

You may see full information about methods at my [github wiki](https://github.com/afferenslucem/declarray/wiki).

## Technologies

Project is created with:

* benchmark 2.1.4
* chai 4.2.0
* ts-mocha 7.0.0
* typescript 3.9.7
