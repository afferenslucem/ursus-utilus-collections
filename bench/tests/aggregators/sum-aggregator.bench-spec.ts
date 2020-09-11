import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const sum = (a: number, b: number) => a + b

function bench(array: number[]): Suite {
    return getSuite('SumAggregator')
    .add('declarray.sum', () => {
        return _(array).sum();
    })
    .add('lodash.sum', () => {
        return lodash(array).sum();
    })
    .add('array.sum', () => {
        return array.reduce(sum)
    })
}

bench_describe('Sum Algorithm', function () {      
    b_chain(bench)
})