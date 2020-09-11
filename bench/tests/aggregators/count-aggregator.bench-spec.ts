import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const count = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('CountAggregator')
    .add('declarray.count', () => {
        return _(array).count();
    })
    .add('lodash.count', () => {
        return lodash(array).value().length;
    })
}

function benchCountBy(array: number[]): Suite {
    return getSuite('CountByAggregator')
    .add('declarray.count with condition', () => {
        return _(array).count(count);
    })
    .add('lodash.countBy', () => {
        return lodash(array).countBy(count).value();
    })
}

bench_describe('Count Algorithm', function () {  
    b_chain(bench)
})

bench_describe('CountBy Algorithm', function () {  
    b_chain(benchCountBy)
})