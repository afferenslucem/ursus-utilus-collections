import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, split } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('Where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .toArray();
    }, split)
    .add('Lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .value();
    })
    .add('Native filter', function () {
        return array.filter(item => (item % 2) == 0);
    })
    .add('Double where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .toArray();
    }, split)
    .add('Double lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .value();
    })
    .add('Double native filter', function () {
        return array
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0);
    })
    .add('10 where', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .where(item => (item % 2) == 0)
        .toArray();
    }, split)
    .add('10 lodash filter', function () {
        return lodash(array)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .value()
    })
    .add('10 native filter', function () {
        return array
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
        .filter(item => (item % 2) == 0)
    })
}

export const filterSuite_1000000 = suite('Filter for 1000000', 100000);
addToSuite(filterSuite_1000000);

export const filterSuite_1000 = suite('Filter for 1000', 1000);
addToSuite(filterSuite_1000);

export const filterSuite_10 = suite('Filter for 10', 10);
addToSuite(filterSuite_10);