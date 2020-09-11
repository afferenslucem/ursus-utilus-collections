import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('Union Collection')
    .add('declarray.union', () => {
        return _(array).union(second).toArray();
    })
    .add('lodash.union', () => {
        return lodash(array).union(second).value();
    })
}

function benchBy(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('Union Collection')
    .add('declarray.union', () => {
        return _(array).union(second, (a, b) => (a % 25) === (b % 25)).toArray();
    })
    .add('lodash.unionBy', () => {
        return lodash(array).unionBy(second, item => item % 25).value();
    })
}

bench_describe('Union Collection', function () {  
    b_chain(bench)
})

bench_describe('UnionBy Collection', function () {  
    b_chain(benchBy)
})