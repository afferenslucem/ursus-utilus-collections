import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, getArrayDesc } from "./common/suite";
import Benchmark from 'benchmark';

// @ts-ignore
let sortingArray = null;

const sortOpt: Benchmark.Options = {
    onStart: () => sortingArray = Array.from(array)
}

function addToSuite(suite: Benchmark.Suite) {
    suite
    .add('Sort', function () {
        // @ts-ignore
        return _(sortingArray)
        .sort()
        .toArray();
    }, sortOpt)
    .add('Lodash sort', function () {
        // @ts-ignore
        return lodash(sortingArray)
        .sort()
        .value();
    }, sortOpt)
    .add('Native sort', function () {
        // @ts-ignore
        return Array.from(sortingArray)
        .sort()
    }, sortOpt)
    .add('SortBy', function () {
        // @ts-ignore
        return _(sortingArray)
        // @ts-ignore
        .sortBy(item => item.toString())
        .toArray();
    }, sortOpt)
    .add('Lodash SortBy', function () {
        // @ts-ignore
        return lodash(sortingArray)
        // @ts-ignore
        .sortBy(item => item.toString())
        .value();
    }, sortOpt)
    .add('Sort after map', function () {
        // @ts-ignore
        return Array.from(sortingArray)
        // @ts-ignore
        .map(item => item.toString())
        .sort();
    }, sortOpt)
}

export const sort_1000000 = suite('Sort for 1000000', 0, getArrayDesc(1000000));
addToSuite(sort_1000000);

export const sort_1000 = suite('Sort for 1000', 0, getArrayDesc(1000));
addToSuite(sort_1000);

export const sort_10 = suite('Sort for 10', 0, getArrayDesc(10));
addToSuite(sort_10);