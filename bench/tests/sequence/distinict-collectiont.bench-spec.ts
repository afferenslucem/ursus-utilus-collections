import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('DistinctCollection')
    .add('declarray.distinct', () => {
        return _(array).distinct().toArray();
    })
    .add('lodash.uniq', () => {
        return lodash(array).uniq().value();
    })
    .add('set', () => {
        return Array.from(new Set(array))
    })
}

function benchDistinctBy(array: number[]): Suite {
    return getSuite('DistinctByCollection')
    .add('declarray.distinct', () => {
        return _(array).distinct({
            equal: (a, b) => Math.abs(a) === Math.abs(b),
            getHashCode: a => Math.abs(a)
        }).toArray();
    })
    .add('lodash.uniqBy', () => {
        return lodash(array).uniqBy(item => item * 2).value();
    });
}

bench_describe('Distinct Algorithm', function () {  
    b_chain(bench)
})

bench_describe('DistinctBy Algorithm', function () {  
    b_chain(benchDistinctBy)
})