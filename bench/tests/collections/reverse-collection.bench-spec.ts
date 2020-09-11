import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

function bench(array: number[]): Suite {
    return getSuite('ReverseCollection')
    .add('declarray.reverse', () => {
        return _(array).reverse().toArray();
    })
    .add('lodash.reverse', () => {
        return Array.from(lodash(array).reverse().value());
    })
    .add('array.reverse', () => {
        return Array.from(array.reverse());
    })
}

bench_describe('Reverse Collection', function () {  
    b_chain(bench)
})