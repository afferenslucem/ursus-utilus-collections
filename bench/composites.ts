import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, getArrayForGrouping, split } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('Where -> Select -> Where', function () {
        return _(array)
        .where(item => !!(item % 2))
        .select(item => item * 4)
        .where(item => (item % 3) == 0)
        .toArray();
    })
    .add('Lodash Filter -> Map -> Filter', function () {
        return lodash(array)
        .filter(item => !!(item % 2))
        .map(item => item * 4)
        .filter(item => (item % 3) == 0)
        .value();
    }).add('Native Filter -> Map -> Filter', function () {
        return array
        .filter(item => !!(item % 2))
        .map(item => item * 4)
        .filter(item => (item % 3) == 0);
    })
    .add('Where -> Where -> Select -> Select -> Where -> Where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .select(item => item * 4)
        .select(item => item * 5)
        .where(item => (item % 3) == 0)
        .where(item => (item % 4) == 0)
        .toArray();
    }, split)
    .add('Lodash Filter -> Filter -> Map -> Map -> Filter -> Filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .map(item => item * 4)
        .map(item => item * 5)
        .filter(item => (item % 3) == 0)
        .filter(item => (item % 4) == 0)
        .value();
    }).add('Native Filter -> Filter -> Map -> Map -> Filter -> Filter', function () {
        return array
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .map(item => item * 4)
        .map(item => item * 5)
        .filter(item => (item % 3) == 0)
        .filter(item => (item % 4) == 0);
    })
};

export const comp_1000000 = suite('Composites for 1000000', 1000000);
addToSuite(comp_1000000)

export const comp_1000 = suite('Composites for 1000', 1000);
addToSuite(comp_1000)

export const comp_10 = suite('Composites for 10', 10);
addToSuite(comp_10)
