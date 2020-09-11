import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import lodash from "lodash";
import { Suite } from "benchmark";

const count = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('ElementAtAggregator')
    .add('declarray.elementAt', () => {
        return _(array).elementAt(5);
    })
    .add('array index', () => {
        return array[5];
    })
}

bench_describe('Element At Algorithm', function () {  
    b_chain(bench)
})