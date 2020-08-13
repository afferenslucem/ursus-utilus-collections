import _ from '../src/index';
import lodash from 'lodash';
import { array, suite, getArrayForGrouping, split } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite.add('Min By', function () {
        return _(array as any[])
        .min((first, second) => first[0] - second[0]);
    }).add('Lodash Min By', function () {
        return lodash(array as any[])
        .minBy(item => item[0]);
    })
    .add('Max By', function () {
        return _(array as any[])
        .max((first, second) => first[0] - second[0])
    }, split)
    .add('Lodash Max By', function () {
        return lodash(array as any[])
        .maxBy(item => item[0]);
    })
}

export const agg_by_1000000 = suite('Aggregate By for 1000000 disp 50', 0, getArrayForGrouping(1000000, 50));
addToSuite(agg_by_1000000);

export const agg_by_1000 = suite('Aggregate By for 1000 disp 50', 0, getArrayForGrouping(1000, 50));
addToSuite(agg_by_1000);

export const agg_by_100 = suite('Aggregate By for 100 disp 50', 0, getArrayForGrouping(100, 50));
addToSuite(agg_by_100);