import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, split } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite
    .add('Distinct', function () {
        return _(array)
        .where(item => (item % 2) == 0)
        .toArray();
    }, split)
    .add('Lodash uniq', function () {
        return lodash(array)
        .uniq()
        .value();
    })
    .add('Distinct by', function () {
        return _(array)
        .distinct(item => -item)
        .toArray();
    }, split)
    .add('Lodash uniqBy', function () {
        return lodash(array)
        .uniqBy(item => -item)
        .value();
    })
}

export const distinctSuite_1000000 = suite('Distinct for 1000000', 100000);
addToSuite(distinctSuite_1000000);

export const distinctSuite_1000 = suite('Distinct for 1000', 1000);
addToSuite(distinctSuite_1000);

export const distinctSuite_10 = suite('Distinct for 10', 10);
addToSuite(distinctSuite_10);