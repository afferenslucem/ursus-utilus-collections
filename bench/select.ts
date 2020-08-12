import _ from '../src/index';
import lodash from 'lodash';
import { array, suite } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('Select', function () {
        return _(array)
        .select(item => item + 1)
        .toArray();
    })
    .add('Lodash map', function () {
        return lodash(array)
        .map(item => item + 1)
        .value();
    })
    .add('Native map', function () {
        return array.map(item => item + 1)
    })
    .add('Double select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('Lodash double map', function () {
        return lodash(array)
        .map(item => item + 1)
        .map(item => item + 1)
        .value();
    })
    .add('Double native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1);
    })
    .add('10 select', function () {
        return _(array)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .select(item => item + 1)
        .toArray();
    })
    .add('Lodash 10 map', function () {
        return lodash(array)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .value()
    })
    .add('10 native map', function () {
        return array
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
        .map(item => item + 1)
    })
}

export const select_1000000 = suite('Select for 1000000', 1000000);
addToSuite(select_1000000);

export const select_1000 = suite('Select for 1000', 1000);
addToSuite(select_1000);

export const select_10 = suite('Select for 10', 10);
addToSuite(select_10);