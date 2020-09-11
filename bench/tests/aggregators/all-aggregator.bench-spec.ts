import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const exists = (item: number) => item > 0

function bench(array: number[]): Suite {
    return getSuite('All Algorithm')
    .add('declarray.all', () => {
        return _(array).all(exists);
    })
    .add('lodash.every', () => {
        return lodash(array).every(exists);
    })
    .add('array.every', () => {
        return array.every(exists)
    })
}

bench_describe('All Algorithm', function () {  
    b_chain(bench)
})