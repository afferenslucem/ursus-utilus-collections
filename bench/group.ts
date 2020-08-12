import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, getArrayDesc, getArrayForGrouping } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('GroupBy', function () {
        return _(array as any[])
        .groupBy(item => item[0])
        .toArray();
    }).add('Lodash GroupBy', function () {
        return lodash(array as any[])
        .groupBy(item => item[0])
        .toArray();
    })
    .add('GroupBy with map', function () {
        return _(array as any[])
        .groupBy(item => item[0], group => group.first())
        .toArray();
    })
}

export const group_1000000_10 = suite('Group for 1000000 with desp 10', 0, getArrayForGrouping(1000000, 10));
addToSuite(group_1000000_10);

export const group_1000000_25 = suite('Group for 1000000 with desp 25', 0, getArrayForGrouping(1000000, 25));
addToSuite(group_1000000_25);

export const group_1000000_50 = suite('Group for 1000000 with desp 50', 0, getArrayForGrouping(1000000, 50));
addToSuite(group_1000000_50);

export const group_1000_10 = suite('Group for 1000 with desp 10', 0, getArrayForGrouping(1000, 10));
addToSuite(group_1000_10);

export const group_1000_25 = suite('Group for 1000 with desp 25', 0, getArrayForGrouping(1000, 25));
addToSuite(group_1000_25);

export const group_1000_50 = suite('Group for 1000 with desp 50', 0, getArrayForGrouping(1000, 50));
addToSuite(group_1000_50);

export const group_100_10 = suite('Group for 100 with desp 10', 0, getArrayForGrouping(100, 10));
addToSuite(group_100_10);

export const group_100_25 = suite('Group for 100 with desp 25', 0, getArrayForGrouping(100, 25));
addToSuite(group_100_25);

export const group_100_50 = suite('Group for 100 with desp 50', 0, getArrayForGrouping(100, 50));
addToSuite(group_100_50);