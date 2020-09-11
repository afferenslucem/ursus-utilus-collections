import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('ExceptCollection')
    .add('declarray.except', () => {
        return _(array).except(second).toArray();
    })
    .add('lodash.difference', () => {
        return lodash(array).difference(second).value();
    })
}
function benchBy(array: number[]): Suite {
    const second = _.random(array.length, 500).toArray();
    return getSuite('ExceptCollection')
    .add('declarray.except', () => {
        return _(array).except(second, (a, b) => (a % 25) === (b % 25)).toArray();
    })
    .add('lodash.differenceBy', () => {
        return lodash(array).differenceBy(second, item => item % 25).value();
    })
}

bench_describe('Except Collection', function () {  
    b_chain(bench)
})

bench_describe('ExceptBy Collection', function () {  
    b_chain(benchBy)
})