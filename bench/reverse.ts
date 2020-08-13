import _ from '../src/index';
import lodash from 'lodash';
import { array, suite } from "./common/suite";
import Benchmark from 'benchmark';

function addToSuite(suite: Benchmark.Suite) {
    suite
    .add('Reverse', function () {
        // @ts-ignore
        return _(array)
        .reverse()
        .toArray();
    })
    .add('Lodash reverse', function () {
        // @ts-ignore
        return lodash(Array.from(array))
        .reverse()
        .value();
    })
    .add('Native reverse', function () {
        // @ts-ignore
        return Array.from(array)
        .reverse()
    })
}

export const reverse_1000000 = suite('Reverse for 1000000', 1000000);
addToSuite(reverse_1000000);

export const reverse_1000 = suite('Reverse for 1000', 1000);
addToSuite(reverse_1000);

export const reverse_10 = suite('Reverse for 10', 10);
addToSuite(reverse_10);