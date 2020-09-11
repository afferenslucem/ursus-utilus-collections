import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const sum = (a: number, b: number) => a + b

function bench(array: number[]): Suite {
    return getSuite('ReduceAggregator')
    .add('declarray.aggregate', () => {
        _(array).aggregate(sum);
    })
    .add('lodash.reduce', () => {
        lodash(array).reduce(sum);
    })
    .add('array.reduce', () => {
        array.reduce(sum)
    })
}

bench_describe('Reduce Algorithm', function () {      
    b_chain(bench)
})