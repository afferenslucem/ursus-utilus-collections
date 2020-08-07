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

## Examples

``````typescript
import _ from 'ursus-utilus-collections';

const c = _([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    .where(item => !(item % 2))
    .where(item => !(item % 3))
    .toArray();

console.log(c);
``````

## Setup

``````bash
$npm install ursus-utilus-logger
``````
