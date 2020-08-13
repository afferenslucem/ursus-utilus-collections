import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, getArrayForGrouping, split } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('Min', function () {
        return _(array)
        .min();
    }).add('Lodash Min', function () {
        return lodash(array)
        .min();
    })
    .add('Max', function () {
        return _(array)
        .max()
    }, split)
    .add('Lodash Max', function () {
        return lodash(array)
        .max();
    })
    .add('First', function () {
        return _(array)
        .first()
    }, split)
    .add('Lodash First', function () {
        return lodash(array)
        .first();
    })
    .add('Last', function () {
        return _(array)
        .last()
    }, split)
    .add('Lodash Last', function () {
        return lodash(array)
        .last();
    })
    .add('Exists', function () {
        return _(array)
        .exists(item => (item % 9) == 0)
    }, split)
    .add('Lodash some', function () {
        return lodash(array)
        .some(item => (item % 9) == 0);
    })
    .add('Native some', function () {
        return array
        .some(item => (item % 9) == 0);
    })
}

export const agg_1000000 = suite('Aggregate for 1000000', 1000000);
addToSuite(agg_1000000);

export const agg_1000 = suite('Aggregate for 1000', 1000);
addToSuite(agg_1000);

export const agg_10 = suite('Aggregate for 10', 10);
addToSuite(agg_10);