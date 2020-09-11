import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const exists = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('AnyAggregator')
    .add('declarray.any', () => {
        return _(array).any(exists);
    })
    .add('lodash.some', () => {
        return lodash(array).some(exists);
    })
    .add('array.some', () => {
        return array.some(exists)
    })
}

bench_describe('Any Algorithm', function () {  
    b_chain(bench)
})