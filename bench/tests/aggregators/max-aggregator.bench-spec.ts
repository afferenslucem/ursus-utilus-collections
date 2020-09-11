import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const max = (a: number, b: number) => Math.max(a, b)

function bench(array: number[]): Suite {
    return getSuite('MaxAggregator')
    .add('declarray.max', () => {
        _(array).max();
    })
    .add('lodash.max', () => {
        lodash(array).max();
    })
    .add('array.reduce', () => {
        array.reduce(max)
    })
}

bench_describe('Max Algorithm', function () {  
    b_chain(bench)
})

function benchSorted(array: number[]): Suite {
    const sorted = _.range(0, array.length - 1).toArray();

    return getSuite('MaxAggregator (Sorted)')
    .add('declarray.max', () => {
        _(sorted).max();
    })
    .add('lodash.max', () => {
        lodash(sorted).max();
    })
    .add('array.reduce', () => {
        sorted.reduce(max)
    })
}

bench_describe('Max Algorithm (Sorted)', function () {  
    b_chain(benchSorted)
})

function benchSortedDesc(array: number[]): Suite {
    const sorted = _.range(0, array.length - 1).reverse().toArray();

    return getSuite('MaxAggregator (Sorted Desc)')
    .add('declarray.max', () => {
        _(sorted).max();
    })
    .add('lodash.max', () => {
        lodash(sorted).max();
    })
    .add('array.reduce', () => {
        sorted.reduce(max)
    })
}

bench_describe('Max Algorithm (Sorted Desc)', function () {  
    b_chain(benchSortedDesc)
})