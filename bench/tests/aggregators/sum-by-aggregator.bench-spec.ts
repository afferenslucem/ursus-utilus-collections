import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const sum = (a: number, b: number) => a + b

function bench(array: number[]): Suite {
    return getSuite('SumByAggregator')
    .add('declarray.sum', () => {
        return _(array).sum(item => item);
    })
    .add('lodash.sumBy', () => {
        return lodash(array).sumBy(item => item);
    })
    .add('array.sum', () => {
        return array.reduce(sum)
    })
}

bench_describe('SumBy Algorithm', function () {      
    b_chain(bench)
})