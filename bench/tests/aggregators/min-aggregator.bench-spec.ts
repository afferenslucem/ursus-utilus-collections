import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const min = (a: number, b: number) => Math.min(a, b)

function bench(array: number[]): Suite {
    return getSuite('MinAggregator')
    .add('declarray.min', () => {
        _(array).min();
    })
    .add('lodash.min', () => {
        lodash(array).min();
    })
    .add('array.reduce', () => {
        array.reduce(min)
    })
}

bench_describe('Min Algorithm', function () {  
    b_chain(bench)
})

function benchSorted(array: number[]): Suite {
    const sorted = _.range(0, array.length - 1).toArray();

    return getSuite('MinAggregator (Sorted)')
    .add('declarray.min', () => {
        _(sorted).min();
    })
    .add('lodash.min', () => {
        lodash(sorted).min();
    })
    .add('array.reduce', () => {
        sorted.reduce(min)
    })
}

bench_describe('Min Algorithm (Sorted)', function () {  
    b_chain(benchSorted)
})

function benchSortedDesc(array: number[]): Suite {
    const sorted = _.range(0, array.length - 1).reverse().toArray();

    return getSuite('MinAggregator (Sorted Desc)')
    .add('declarray.min', () => {
        _(sorted).min();
    })
    .add('lodash.min', () => {
        lodash(sorted).min();
    })
    .add('array.reduce', () => {
        sorted.reduce(min)
    })
}

bench_describe('Min Algorithm (Sorted Desc)', function () {  
    b_chain(benchSortedDesc)
})