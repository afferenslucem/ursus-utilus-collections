import {getSuite, b_chain, bench_describe } from "../../common/suite";
import _ from "../../../src/index";
import { Suite } from "benchmark";

const count = (item: number) => item > 100

function bench(array: number[]): Suite {
    return getSuite('CountWhileAggregator')
    .add('declarray.countWhile', () => {
        return _(array).countWhile(count);
    })
}

bench_describe('Count While Algorithm', function () {  
    b_chain(bench)
})