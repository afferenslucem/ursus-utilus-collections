import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('IntersectCollection')
    .add('declarray.intersect', () => {
        return _(array).intersect(second).toArray();
    })
    .add('lodash.intersection', () => {
        return lodash(array).intersection(second).value();
    })
}

function benchBy(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('IntersectCollection')
    .add('declarray.intersect', () => {
        return _(array).intersect(second, {
            equal: (a, b) => a % 25 === b % 25,
            getHashCode: a => a % 25
        }).toArray();
    })
    .add('lodash.intersectionBy', () => {
        return lodash(array).intersectionBy(second, item => item % 25).value();
    })
}

bench_describe('Intersect Collection', function () {  
    b_chain(bench)
})

bench_describe('IntersectBy Collection', function () {  
    b_chain(benchBy)
})